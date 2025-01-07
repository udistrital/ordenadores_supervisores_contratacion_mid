export interface StandardResponse<T> {
  Success: boolean;
  Status: number;
  Message: string;
  Data?: T;
}

export interface UsuarioResponse {
  Id: number;
  NombreCompleto: string;
}
