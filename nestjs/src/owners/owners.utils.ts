export const formatOwnerDtoToOwnerDb = (ownerDto, userId) => {
    return {
        user_id: userId,
        name: ownerDto.name??'',
        email: ownerDto.email??'',
        street: ownerDto.street??'',
        city: ownerDto.city??'',
        zip: ownerDto.zip??'',
        signature: ownerDto.signature??'',
        phone: ownerDto.phone??''
    };
}