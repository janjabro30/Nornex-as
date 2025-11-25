import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateInquiryDto, UpdateInquiryDto } from './dto/inquiry.dto';
import { InquiryStatus } from '@prisma/client';

@Injectable()
export class InquiriesService {
  constructor(private prisma: PrismaService) {}

  async create(createInquiryDto: CreateInquiryDto) {
    return this.prisma.inquiry.create({
      data: createInquiryDto,
    });
  }

  async findAll(page: number = 1, limit: number = 10, status?: InquiryStatus) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (status) {
      where.status = status;
    }

    const [inquiries, total] = await Promise.all([
      this.prisma.inquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          assignedUser: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.inquiry.count({ where }),
    ]);

    return {
      data: inquiries,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id },
      include: {
        assignedUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!inquiry) {
      throw new NotFoundException('Inquiry not found');
    }

    return inquiry;
  }

  async update(id: string, updateInquiryDto: UpdateInquiryDto) {
    await this.findOne(id);
    return this.prisma.inquiry.update({
      where: { id },
      data: updateInquiryDto,
    });
  }

  async updateStatus(id: string, status: InquiryStatus) {
    await this.findOne(id);
    return this.prisma.inquiry.update({
      where: { id },
      data: { status },
    });
  }

  async assign(id: string, userId: string) {
    await this.findOne(id);
    return this.prisma.inquiry.update({
      where: { id },
      data: { assignedTo: userId },
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.inquiry.delete({
      where: { id },
    });
  }

  async getStats() {
    const [total, byStatus] = await Promise.all([
      this.prisma.inquiry.count(),
      this.prisma.inquiry.groupBy({
        by: ['status'],
        _count: true,
      }),
    ]);

    return {
      total,
      byStatus: byStatus.reduce(
        (acc, item) => {
          acc[item.status] = item._count;
          return acc;
        },
        {} as Record<string, number>,
      ),
    };
  }
}
