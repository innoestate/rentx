
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