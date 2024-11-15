import { Test, TestingModule } from '@nestjs/testing';
import { OrdenadorController } from './ordenador.controller';
import { OrdenadorService } from './ordenador.service';

describe('OrdenadorController', () => {
  let controller: OrdenadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdenadorController],
      providers: [OrdenadorService],
    }).compile();

    controller = module.get<OrdenadorController>(OrdenadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
