import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { OrdenadorService } from './ordenador.service';

describe('OrdenadorService', () => {
  let service: OrdenadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [OrdenadorService],
    }).compile();

    service = module.get<OrdenadorService>(OrdenadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
