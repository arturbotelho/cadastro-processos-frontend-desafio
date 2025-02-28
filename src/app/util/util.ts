
export class Util {

    static getBaseUrl = () => {
        return 'http://localhost:8080/api/v1'
    }
    
    static npuFormatToStr = (npu: string): string => {
        return npu.replace(/(\d{7})(\d{2})(\d{4})(\d)(\d{2})(\d{4})/, '$1-$2.$3.$4.$5.$6');
    }
}