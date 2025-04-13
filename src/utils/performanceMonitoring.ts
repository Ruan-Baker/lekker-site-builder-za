
/**
 * Performance Monitoring Utility
 * 
 * This utility helps track performance metrics across the application
 * and identify potential bottlenecks or performance issues.
 */

interface PerformanceEntry {
  label: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, any>;
}

interface PerformanceMetrics {
  timeToInteractive: number;
  memoryUsage: number | null;
  renderCounts: Record<string, number>;
  slowRenders: PerformanceEntry[];
  slowOperations: PerformanceEntry[];
  navigationTiming: Record<string, number>;
  resourceTiming: PerformanceEntry[];
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private measurements: Map<string, PerformanceEntry>;
  private renderCounts: Map<string, number>;
  private isEnabled: boolean;
  private thresholds: {
    slowRender: number;
    slowOperation: number;
  };
  private slowRenders: PerformanceEntry[];
  private slowOperations: PerformanceEntry[];
  
  private constructor() {
    this.measurements = new Map();
    this.renderCounts = new Map();
    this.isEnabled = process.env.NODE_ENV === 'development';
    this.thresholds = {
      slowRender: 16, // ms - 60fps frame budget
      slowOperation: 100 // ms
    };
    this.slowRenders = [];
    this.slowOperations = [];
    
    // Initialize performance observer if available
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.initPerformanceObservers();
    }
  }
  
  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }
  
  // Enable or disable performance monitoring
  public enable(isEnabled: boolean): void {
    this.isEnabled = isEnabled;
  }
  
  // Start measuring an operation
  public startMeasure(label: string, metadata?: Record<string, any>): void {
    if (!this.isEnabled) return;
    
    this.measurements.set(label, {
      label,
      startTime: performance.now(),
      metadata
    });
  }
  
  // End measuring an operation and return the duration
  public endMeasure(label: string, additionalMetadata?: Record<string, any>): number | undefined {
    if (!this.isEnabled) return;
    
    const measurement = this.measurements.get(label);
    if (!measurement) {
      console.warn(`No measurement found with label: ${label}`);
      return;
    }
    
    const endTime = performance.now();
    const duration = endTime - measurement.startTime;
    
    const updatedMeasurement = {
      ...measurement,
      endTime,
      duration,
      metadata: {
        ...measurement.metadata,
        ...additionalMetadata
      }
    };
    
    this.measurements.set(label, updatedMeasurement);
    
    // Check if this is a slow operation
    if (duration > this.thresholds.slowOperation) {
      this.slowOperations.push(updatedMeasurement);
      console.warn(`Slow operation detected: ${label} took ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }
  
  // Track component renders
  public trackRender(componentName: string): void {
    if (!this.isEnabled) return;
    
    const currentCount = this.renderCounts.get(componentName) || 0;
    this.renderCounts.set(componentName, currentCount + 1);
    
    const startTime = performance.now();
    
    // Use requestAnimationFrame to measure render time
    requestAnimationFrame(() => {
      const duration = performance.now() - startTime;
      
      // Check for slow renders
      if (duration > this.thresholds.slowRender) {
        const renderInfo = {
          label: `${componentName} render`,
          startTime,
          endTime: performance.now(),
          duration
        };
        
        this.slowRenders.push(renderInfo);
        console.warn(`Slow render detected: ${componentName} took ${duration.toFixed(2)}ms to render`);
      }
    });
  }
  
  // Get performance metrics
  public getMetrics(): PerformanceMetrics {
    const timeToInteractive = this.getTimeToInteractive();
    const memoryUsage = this.getMemoryUsage();
    const renderCounts = Object.fromEntries(this.renderCounts);
    const navigationTiming = this.getNavigationTiming();
    
    return {
      timeToInteractive,
      memoryUsage,
      renderCounts,
      slowRenders: [...this.slowRenders],
      slowOperations: [...this.slowOperations],
      navigationTiming,
      resourceTiming: this.getResourceTiming()
    };
  }
  
  // Get a specific measurement
  public getMeasurement(label: string): PerformanceEntry | undefined {
    return this.measurements.get(label);
  }
  
  // Clear all measurements
  public clearMeasurements(): void {
    this.measurements.clear();
    this.slowRenders = [];
    this.slowOperations = [];
  }
  
  // Log all performance data
  public logPerformance(): void {
    if (!this.isEnabled) return;
    
    console.group('Performance Metrics');
    console.log('Time to Interactive:', this.getTimeToInteractive(), 'ms');
    console.log('Memory Usage:', this.getMemoryUsage(), 'MB');
    console.log('Render Counts:', Object.fromEntries(this.renderCounts));
    
    if (this.slowRenders.length > 0) {
      console.group('Slow Renders');
      this.slowRenders.forEach(render => {
        console.log(`${render.label}: ${render.duration?.toFixed(2)}ms`);
      });
      console.groupEnd();
    }
    
    if (this.slowOperations.length > 0) {
      console.group('Slow Operations');
      this.slowOperations.forEach(op => {
        console.log(`${op.label}: ${op.duration?.toFixed(2)}ms`, op.metadata || '');
      });
      console.groupEnd();
    }
    
    console.groupEnd();
  }
  
  // Initialize performance observers to collect additional metrics
  private initPerformanceObservers(): void {
    try {
      // Observe layout shifts
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // @ts-ignore - Layout Shift API not in TypeScript defs
          if (entry.hadRecentInput) continue;
          
          console.debug('Layout shift detected:', entry);
        }
      });
      
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      
      // Observe long tasks
      const longTaskObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.warn('Long task detected:', entry.duration, 'ms', entry);
          
          this.slowOperations.push({
            label: 'Long Browser Task',
            startTime: entry.startTime,
            endTime: entry.startTime + entry.duration,
            duration: entry.duration,
            metadata: {
              entryType: entry.entryType,
              name: entry.name
            }
          });
        }
      });
      
      longTaskObserver.observe({ type: 'longtask', buffered: true });
      
      // Observe resource loading
      const resourceObserver = new PerformanceObserver((entryList) => {
        // Process only the slowest resources
        for (const entry of entryList.getEntries()) {
          if (entry.duration > 1000) { // 1 second threshold
            console.warn('Slow resource load:', entry.name, entry.duration, 'ms');
          }
        }
      });
      
      resourceObserver.observe({ type: 'resource', buffered: true });
      
    } catch (e) {
      console.error('Error setting up performance observers:', e);
    }
  }
  
  // Get time to interactive
  private getTimeToInteractive(): number {
    if (typeof window === 'undefined' || !window.performance) return 0;
    
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!navigationEntry) return 0;
    
    return navigationEntry.domInteractive;
  }
  
  // Get memory usage (if available)
  private getMemoryUsage(): number | null {
    if (typeof window === 'undefined' || !window.performance) return null;
    
    // @ts-ignore - Chrome-specific API
    const memory = performance.memory;
    if (!memory) return null;
    
    // Convert bytes to megabytes
    return Math.round(memory.usedJSHeapSize / (1024 * 1024));
  }
  
  // Get navigation timing metrics
  private getNavigationTiming(): Record<string, number> {
    if (typeof window === 'undefined' || !window.performance) return {};
    
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!navigationEntry) return {};
    
    return {
      fetchStart: navigationEntry.fetchStart,
      domContentLoaded: navigationEntry.domContentLoadedEventEnd,
      domComplete: navigationEntry.domComplete,
      loadEvent: navigationEntry.loadEventEnd,
      firstByte: navigationEntry.responseStart - navigationEntry.requestStart,
      redirectTime: navigationEntry.redirectEnd - navigationEntry.redirectStart,
      dnsLookup: navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart,
      tcpConnection: navigationEntry.connectEnd - navigationEntry.connectStart
    };
  }
  
  // Get resource timing information
  private getResourceTiming(): PerformanceEntry[] {
    if (typeof window === 'undefined' || !window.performance) return [];
    
    const resourceEntries = performance.getEntriesByType('resource');
    return resourceEntries.map(entry => ({
      label: entry.name,
      startTime: entry.startTime,
      endTime: entry.startTime + entry.duration,
      duration: entry.duration,
      metadata: {
        entryType: entry.entryType,
        initiatorType: (entry as PerformanceResourceTiming).initiatorType
      }
    }));
  }
}

// Export a singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// React hook for performance tracking
export function usePerformanceTracking(componentName: string) {
  if (process.env.NODE_ENV !== 'production') {
    performanceMonitor.trackRender(componentName);
  }
  
  return {
    startMeasure: (label: string, metadata?: Record<string, any>) => 
      performanceMonitor.startMeasure(`${componentName}:${label}`, metadata),
      
    endMeasure: (label: string, additionalMetadata?: Record<string, any>) => 
      performanceMonitor.endMeasure(`${componentName}:${label}`, additionalMetadata)
  };
}

export default performanceMonitor;
