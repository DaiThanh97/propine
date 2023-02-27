import * as fs from 'fs';
import * as papaparse from 'papaparse';
import { IRow } from '../crypto/crypto.type';

export const csvToData = <T>(
  pathToCsv: string,
  onStep: (row: IRow<T>) => void,
  onComplete: () => void,
) => {
  papaparse.parse(fs.createReadStream(pathToCsv), {
    header: true,
    worker: true,
    fastMode: true,
    dynamicTyping: true,
    delimiter: ',',
    step: onStep,
    complete: onComplete,
  });
};
