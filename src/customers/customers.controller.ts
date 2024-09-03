import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { AllExceptionsFilter } from 'src/common/exception-filters/all-exception.filter';
import { UtilsProvider } from 'src/common/utils/utils.provider';
import { ZodValidationPipe } from 'src/common/validation-pipes/zod-validation.pipe';
import {
  CreateCustomerDto,
  createCustomerSchema,
} from './dto/create-customer.dto';
import {
  UpdateCustomerDto,
  updateCustomerSchema,
} from './dto/update-customer.dto';
import { CustomersService } from './services/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly utilsProvider: UtilsProvider,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe({ body: createCustomerSchema }))
  @UseFilters(AllExceptionsFilter)
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.utilsProvider.responseBuilder.success(
      await this.customersService.create(createCustomerDto),
      'Customer created',
    );
  }

  @Get()
  async findAll() {
    return this.utilsProvider.responseBuilder.success(
      await this.customersService.findAll(),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.utilsProvider.responseBuilder.success(
      await this.customersService.findById(id),
    );
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe({ body: updateCustomerSchema }))
  @UseFilters(AllExceptionsFilter)
  async update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.utilsProvider.responseBuilder.success(
      await this.customersService.update(id, updateCustomerDto),
      'Customer updated',
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.utilsProvider.responseBuilder.success(
      await this.customersService.remove(id),
    );
  }

  @Post('restore/:id')
  async restore(@Param('id') id: number) {
    return this.utilsProvider.responseBuilder.success(
      await this.customersService.restore(id),
    );
  }
}
