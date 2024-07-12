export function getRandomReplId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomReplId = '';
    for (let i = 0; i < 40; i++) {
        randomReplId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomReplId;
}