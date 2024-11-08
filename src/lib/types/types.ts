// Referrals table
export interface PatientTableCellData {
  field: string;
  id: string;
  value: any;
}

export type ExecuteOperationResponse<ResponseData> = {
  body: {
    kind: 'single';
    singleResult: {
      data: ResponseData;
    };
  };
};

export type ExecuteOperationError<ErrorResponse> = {
  body: {
    kind: 'single';
    singleResult: {
      errors: ErrorResponse;
    };
  };
};

export type EyesToBeDone = 'both' | 'left' | 'right';
