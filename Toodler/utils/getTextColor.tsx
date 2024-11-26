export default function getTextColor(backgroundColor: string): string {
// Helper function to get text color based on background color 
    const getTextColor = (backgroundColor: string) => {
    // Convert HEX to RGB
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    // Calculate luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Return black or white
    return luminance > 0.5 ? '#000' : '#FFF';
    };
    return getTextColor(backgroundColor);
}