import { Pipe, PipeTransform } from '@angular/core';
import prettyMs from 'pretty-ms';

@Pipe({
  name: 'prettyMs'
})
export class PrettyMsPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return prettyMs(value, {compact: true});
  }
}
