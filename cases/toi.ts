import * as toi from '@toi/toi'
import { Case, ICase } from './abstract'

const obj = () => toi.required().and(toi.obj.isplain())
const req = () => toi.required()
const num = () => toi.num.is()
const str = () => toi.str.is()

const isValid = obj().and(
  toi.obj.keys({
    number: req().and(num()),
    neg_number: req().and(num().and(toi.num.max(0))),
    max_number: req().and(num().and(toi.num.max(Number.MAX_VALUE))),
    string: req().and(str()),
    long_string: req().and(str().and(toi.str.min(100))),
    boolean: req().and(toi.bool.is()),
    deeplyNested: obj().and(toi.obj.keys({
      foo: req().and(str()),
      num: req().and(num()),
      bool: req().and(toi.bool.is())
    }))
  })
)

export class ToiCase extends Case implements ICase {
  name = 'toi'

  validate() {
    return isValid(this.data)
  }
}