import Vue from 'vue'
import { PortalTarget, wormhole } from 'portal-vue'
import warn from '../../utils/warn'
import { getById } from '../../utils/dom'

/* istanbul ignore file: for now until ready for testing */

const NAME = 'BToaster'

export default Vue.extend({
  name: NAME,
  props: {
    name: {
      type: String,
      required: true
    },
    transition: {
      type: [Boolean, String, Object],
      default: false
    }
  },
  data() {
    return {
      // We don't render on SSR or if a an existing target found
      doRender: false
    }
  },
  beforeMount() {
    /* istanbul ignore if */
    if (getById(this.name) || wormhole.targets[this.name] ) {
      warn(`b-toaster: A <portal-target> name '${this.name}' already eixsts in the document`)
    } else {
      this.doRender = true
    }
  },
  render(h) {
    /* istanbul ignore else */
    if (this.doRender) {
      return h(PortalTarget, {
        staticClass: 'b-toaster',
        class: [this.name],
        attrs: { id: this.name },
        props: {
          name: this.name,
          multiple: true,
          tag: 'div',
          slim: false,
          transition: this.transition
        }
      })
    } else {
      return h('div', {})
    }
  }
})
