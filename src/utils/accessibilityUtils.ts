
/**
 * Accessibility Utilities
 * 
 * A collection of utilities to help improve web accessibility compliance
 */

// Types
export interface AccessibilityViolation {
  element: HTMLElement;
  rule: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  description: string;
  help?: string;
}

export interface AccessibilityReport {
  violations: AccessibilityViolation[];
  passes: number;
  incomplete: number;
  timestamp: Date;
}

// Check if an element has sufficient color contrast
export function hasGoodContrast(foreground: string, background: string): boolean {
  // Convert hex colors to RGB
  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);
  
  if (!fgRgb || !bgRgb) return false;
  
  // Calculate relative luminance
  const fgLuminance = calculateLuminance(fgRgb);
  const bgLuminance = calculateLuminance(bgRgb);
  
  // Calculate contrast ratio
  const ratio = calculateContrastRatio(fgLuminance, bgLuminance);
  
  // WCAG 2.1 Level AA requires a contrast ratio of at least 4.5:1 for normal text
  // and 3:1 for large text
  return ratio >= 4.5;
}

// Check if text is large enough
export function isTextSizeLarge(fontSize: string): boolean {
  // Extract the numeric value and unit
  const match = fontSize.match(/^(\d+)(px|em|rem|pt|%)$/);
  if (!match) return false;
  
  const value = parseFloat(match[1]);
  const unit = match[2];
  
  // Convert to pixels for comparison (approximations)
  let pixelSize = value;
  
  switch (unit) {
    case 'em':
    case 'rem':
      pixelSize = value * 16; // Assuming default font size is 16px
      break;
    case 'pt':
      pixelSize = value * (4/3); // 1pt ≈ 1.333px
      break;
    case '%':
      pixelSize = (value / 100) * 16; // Assuming default font size is 16px
      break;
  }
  
  // WCAG 2.1 recommends a minimum text size of 16px
  return pixelSize >= 16;
}

// Ensure image has alt text
export function imageHasAltText(imgElement: HTMLImageElement): boolean {
  return imgElement.hasAttribute('alt');
}

// Check if a heading structure is proper (no skipped levels)
export function validateHeadingStructure(document: Document): boolean {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let prevLevel = 0;
  
  for (let i = 0; i < headings.length; i++) {
    const currentLevel = parseInt(headings[i].tagName.substring(1), 10);
    
    // First heading should be h1
    if (i === 0 && currentLevel !== 1) {
      return false;
    }
    
    // Headings shouldn't skip levels going down (e.g., h2 to h4)
    if (currentLevel > prevLevel && currentLevel > prevLevel + 1) {
      return false;
    }
    
    prevLevel = currentLevel;
  }
  
  return true;
}

// Check if an element is keyboard navigable
export function isKeyboardNavigable(element: HTMLElement): boolean {
  // Interactive elements that should be keyboard navigable
  const interactiveElements = ['a', 'button', 'input', 'select', 'textarea'];
  
  // Check if element is one of the navigable types
  if (interactiveElements.includes(element.tagName.toLowerCase())) {
    return !element.hasAttribute('tabindex') || 
           parseInt(element.getAttribute('tabindex') || '0', 10) >= 0;
  }
  
  // Check if it has a role that makes it interactive
  const interactiveRoles = ['button', 'link', 'checkbox', 'menuitem', 'tab'];
  const role = element.getAttribute('role');
  
  if (role && interactiveRoles.includes(role)) {
    return !element.hasAttribute('tabindex') || 
           parseInt(element.getAttribute('tabindex') || '0', 10) >= 0;
  }
  
  return false;
}

// Generate an accessibility report for the current page
export function generateAccessibilityReport(rootElement: HTMLElement = document.body): AccessibilityReport {
  const violations: AccessibilityViolation[] = [];
  let passes = 0;
  let incomplete = 0;
  
  // Check images for alt text
  const images = rootElement.querySelectorAll('img');
  images.forEach(img => {
    if (!imageHasAltText(img)) {
      violations.push({
        element: img,
        rule: 'img-alt',
        impact: 'serious',
        description: 'Image does not have alt text',
        help: 'Add alt attribute to provide alternative text for images'
      });
    } else {
      passes++;
    }
  });
  
  // Check for proper heading structure
  if (!validateHeadingStructure(document)) {
    const headings = rootElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length > 0) {
      violations.push({
        element: headings[0] as HTMLElement,
        rule: 'heading-order',
        impact: 'moderate',
        description: 'Heading levels should not be skipped',
        help: 'Ensure headings are ordered properly (h1, then h2, etc.)'
      });
    }
  } else {
    passes++;
  }
  
  // Check form elements for labels
  const formElements = rootElement.querySelectorAll('input, select, textarea');
  formElements.forEach(element => {
    const id = element.getAttribute('id');
    let hasLabel = false;
    
    // Check for associated label element
    if (id) {
      hasLabel = !!document.querySelector(`label[for="${id}"]`);
    }
    
    // Check for aria-label or aria-labelledby
    hasLabel = hasLabel || 
               element.hasAttribute('aria-label') || 
               element.hasAttribute('aria-labelledby');
    
    if (!hasLabel) {
      violations.push({
        element: element as HTMLElement,
        rule: 'label',
        impact: 'critical',
        description: 'Form element does not have an associated label',
        help: 'Add a label element with for attribute or use aria-label/aria-labelledby'
      });
    } else {
      passes++;
    }
  });
  
  // Check for sufficient color contrast (limited capability without design info)
  // This would require analysis of computed styles
  incomplete++;
  
  // Check for keyboard navigability
  const interactiveElements = rootElement.querySelectorAll('a, button, input, select, textarea, [role="button"], [role="link"]');
  interactiveElements.forEach(element => {
    if (!isKeyboardNavigable(element as HTMLElement)) {
      violations.push({
        element: element as HTMLElement,
        rule: 'keyboard-navigable',
        impact: 'serious',
        description: 'Interactive element is not keyboard navigable',
        help: 'Ensure interactive elements can be accessed with the keyboard'
      });
    } else {
      passes++;
    }
  });
  
  return {
    violations,
    passes,
    incomplete,
    timestamp: new Date()
  };
}

// Helper function: Convert hex color to RGB
function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Handle shorthand hex format (e.g., #FFF)
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Validate values
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return null;
  }
  
  return { r, g, b };
}

// Helper function: Calculate relative luminance from RGB
function calculateLuminance(rgb: { r: number, g: number, b: number }): number {
  // Convert RGB to relative luminance using WCAG formula
  const rsrgb = rgb.r / 255;
  const gsrgb = rgb.g / 255;
  const bsrgb = rgb.b / 255;
  
  const r = rsrgb <= 0.03928 ? rsrgb / 12.92 : Math.pow((rsrgb + 0.055) / 1.055, 2.4);
  const g = gsrgb <= 0.03928 ? gsrgb / 12.92 : Math.pow((gsrgb + 0.055) / 1.055, 2.4);
  const b = bsrgb <= 0.03928 ? bsrgb / 12.92 : Math.pow((bsrgb + 0.055) / 1.055, 2.4);
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Helper function: Calculate contrast ratio
function calculateContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

// Simple function to make text more accessible
export function improveTextAccessibility(element: HTMLElement): void {
  // Ensure adequate line height for readability
  element.style.lineHeight = '1.5';
  
  // Ensure adequate paragraph spacing
  if (element.tagName.toLowerCase() === 'p') {
    element.style.marginBottom = '1em';
  }
  
  // Ensure text is not too small
  const computedStyle = window.getComputedStyle(element);
  const fontSize = parseFloat(computedStyle.fontSize);
  
  if (fontSize < 16) {
    element.style.fontSize = '16px';
  }
}

// React hook for accessibility checking
export function useAccessibilityCheck(elementRef: React.RefObject<HTMLElement>) {
  return {
    checkAccessibility: () => {
      if (elementRef.current) {
        return generateAccessibilityReport(elementRef.current);
      }
      return null;
    },
    improveAccessibility: () => {
      if (elementRef.current) {
        improveTextAccessibility(elementRef.current);
      }
    }
  };
}
