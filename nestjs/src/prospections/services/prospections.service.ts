import { Injectable } from "@nestjs/common";
import { ProspectionsDbService } from "./prospections.db.service";
import { ProspectionDto } from "../dto/prospection.dto";

@Injectable()
export class ProspectionsService {

    constructor(private ProspectionsDbService: ProspectionsDbService) { }

    createNewProspection(prospection: ProspectionDto) {
        return this.ProspectionsDbService.create(prospection);
    }

    findAll(user_id: string) {
        return this.ProspectionsDbService.findAll(user_id);
    }

    findOne(id: string) {
        return this.ProspectionsDbService.findOne(id);
    }

    update(id: string, updateProspectionDto: Partial<ProspectionDto>) {
        return this.ProspectionsDbService.update(id, updateProspectionDto);
    }

    updateMany(user_id: string, updateProspectionDto: any) {
        return this.ProspectionsDbService.updateMany(user_id, updateProspectionDto);
    }

    remove(id: string) {
        return this.ProspectionsDbService.remove(id);
    }

}