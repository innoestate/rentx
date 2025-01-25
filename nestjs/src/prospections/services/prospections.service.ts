import { Injectable } from "@nestjs/common";
import { ProspectionsDbService } from "./prospections.db.service";
import { ProspectionDto } from "../dto/prospection.dto";
import { StorageService } from "../../storage/services/storage.service";
import { from, tap } from "rxjs";

@Injectable()
export class ProspectionsService {

    constructor(private ProspectionsDbService: ProspectionsDbService, private storageService: StorageService) { }

    async createNewProspection(prospection: ProspectionDto, accessToken, refreshToken, clientId, clientSecret) {
        const result = await this.ProspectionsDbService.create(prospection);
        try {
            await this.storageService.synchronize(prospection.user_id, accessToken, refreshToken, clientId, clientSecret);
        } catch (e) {
            console.error(e);
        }
        return result;
    }

    findAll(user_id: string) {
        return this.ProspectionsDbService.findAll(user_id);
    }

    findOne(id: string) {
        return this.ProspectionsDbService.findOne(id);
    }

    async update(id: string, updateProspectionDto: Partial<ProspectionDto>, accessToken, refreshToken, clientId, clientSecret) {

        const prospection = await this.ProspectionsDbService.findOne(id);

        return from(this.ProspectionsDbService.update(id, updateProspectionDto)).pipe( tap( update => {
            
            if( updateProspectionDto.address){
                this.storageService.synchronize(prospection.user_id, accessToken, refreshToken, clientId, clientSecret);
            }

            return update;
        }))
    }

    updateMany(user_id: string, updateProspectionDto: any) {
        return this.ProspectionsDbService.updateMany(user_id, updateProspectionDto);
    }

    remove(id: string) {
        return this.ProspectionsDbService.remove(id);
    }

}