export interface StandardResponse<T> {
  Success: boolean;
  Status: number;
  Message: string;
  Data?: T;
}

export interface OrdenadorResponse<> {
  id: number,
  terceroId: number,
  ordenadorArgoId: number,
  ordenadorSikarcaId: number,
  resolucion: string,
  documentoIdentidad: string,
  cargoId: number,
  contrato_general_id: number,
}