export const formatProspectionDtoForCreation = (userId: string, createProspectionDto: any) => {
    const createProspectionDtoKeys = {
        city: '',
        address: '',
        link: '',
        price: 0,
        emission_date: new Date(),
    };
    return { ...createProspectionDtoKeys, ...createProspectionDto, user_id: userId };
}

export const SHEET_SYNCHRONIZATION_INTERVAL_MS = 60000;

export const getLastSpreadSheetSynchronization = (lastSynchronization: number) => {
    return Date.now() - lastSynchronization;
}

export const getNextSpreadSheetSynchronization = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, 0);
}