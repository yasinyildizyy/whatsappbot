export function sanitizePhoneNumbers(numbers: string[]): string[] {
  return numbers.map(number => {
    // Remove spaces, dashes, parentheses, and plus signs
    let sanitized = number.replace(/[\s\-+()]/g, '');
    
    // Ensure international format
    if (sanitized.startsWith('0')) {
      sanitized = '90' + sanitized.substring(1); // Turkey country code
    } else if (!sanitized.startsWith('90')) {
      sanitized = '90' + sanitized;
    }
    
    return sanitized;
  });
}