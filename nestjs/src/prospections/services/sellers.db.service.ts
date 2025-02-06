import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller_Entity } from '../../sellers/models/seller.entity';
import { SellerDto } from '../../sellers/models/create-seller.dto';

@Injectable()
export class SellersDbService {

    constructor(
        @InjectRepository(Seller_Entity)
        private sellerRepository: Repository<Seller_Entity>,
    ) { }

    async createSeller(createSellerDto: SellerDto) {
        try {
            const seller = this.sellerRepository.create(createSellerDto);
            return this.sellerRepository.save(seller);
        } catch (e) {
            console.error(e);
            throw new NotFoundException(`Fail to create Seller`);
        }
    }

    async removeSeller(id: string) {
        try {
            const seller = await this.findOneSeller(id);
            if (!seller) {
                throw new NotFoundException(`Seller with ID "${id}" not found`);
            }
            return this.sellerRepository.remove(seller);
        } catch (e) {
            console.error(e);
            throw new NotFoundException(`Fail to remove "${id}"`);
        }
    }

    async updateSeller(id: string, updateSellerDto: SellerDto) {
        try {
            const seller = await this.findOneSeller(id);
            if (!seller) {
                throw new NotFoundException(`Seller with ID "${id}" not found`);
            }
            Object.assign(seller, updateSellerDto);
            return this.sellerRepository.save(seller);
        } catch (e) {
            console.error(e);
            throw new NotFoundException(`Fail to update Seller with ID "${id}"`);
        }
    }

    async findAllSellers(user_id: string) {
        try {
            return this.sellerRepository.find({
                where: { user_id }
            });
        } catch (e) {
            console.error(e);
            throw new NotFoundException(`Fail to find Sellers`);
        }
    }

    async findOneSeller(id: string) {
        try {
            const seller = await this.sellerRepository.findOne({
                where: { id },
            });
            return seller;
        } catch (e) {
            throw new NotFoundException(`Seller with ID "${id}" not found`);
        }
    }
}
