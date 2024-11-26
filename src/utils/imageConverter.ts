export function getImageVariant(bannerPath: string, variant: string): string {
    return bannerPath.replace(/\.\w+$/, `.${variant}`);
}