export interface StandardResponse<T> {
  Success: boolean;
  Status: number;
  Message: string;
  Data?: T;
}

export interface UsuarioResponse extends Array<{
  Tercero: {
    Id: number;
    NombreCompleto: string;
  };
  Identificacion: {
    Numero: string;
    DigitoVerificacion: number;
    TipoDocumentoId: {
      CodigoAbreviacion: string;
    };
  };
}> {}
