Vue.component('advanced_maps-fieldtype', {
  mixins: [Fieldtype],

  data: function() {
    return {
      //
    };
  },

  computed: {
    styleInstructions: function() {
      if (this.data.mapType === 'google') {
        return 'Get your styles from  <a target="_blank" href="https://snazzymaps.com/">Snazzy Maps</a>';
      }
      return 'Get your styles from <a target="_blank" href="https://studio.mapbox.com/">Mapbox Studio</a>';
    },
    stylesPlaceholder: function() {
      if (this.data.mapType === 'google') {
        return 'Your styles in JSON';
      }
      return 'mapbox://styles/...';
    }
  },

  methods: {
    focus() {
      this.$els.firstInput.focus();
    },
  },

  ready: function() {
    //
  },

  // prettier-ignore
  template: '' +
  '<div style="display: flex; flex-direction: column;">' +
    '<div>' +
      '<input type="radio" id="{{name}}-google" value="google" v-model="data.mapType" />' +
      '<label for="{{name}}-google">Google</label>' +
      '<br />' +
      '<input type="radio" id="{{name}}-mapbox" value="mapbox" v-model="data.mapType" />' +
      '<label for="{{name}}-mapbox">Mapbox</label>' +
    '</div>' +
    '<label>Zoom' +
      '<input v-model="data.zoom" v-el:first-input type="number" min="0" max="20" />' +
    '</label>' +
    '<label>Height' +
      '<input v-model="data.height" />' +
    '</label>' +
    '<label>Width' +
      '<input v-model="data.width" />' +
    '</label>' +
    '<label>Address' +
      '<input v-model="data.address" />' +
    '</label>' +
    '<label for="{{name}}-styles" style="width: 100%">Styles</label>' +
    '<small v-html="styleInstructions"></small>' +
    '<textarea v-if="data.mapType === \'google\'" id="{{name}}-styles" style="width: 100%; height: 400px;" v-model="data.googleStyles" placeholder="{{stylesPlaceholder}}"></textarea>' +
    '<input v-if="data.mapType === \'mapbox\'" id="{{name}}-styles" v-model="data.mapboxStyles" placeholder="{{stylesPlaceholder}}" />' +
  '</div>'
});
