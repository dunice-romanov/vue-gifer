const app = new Vue({
  el: '#app',
  data: {
    GIPHY_CONSTANTS: {
      GIPHY_SECRET: '9332983c6531402ab4727b81454572fb',
      URL_BASE: 'https://api.giphy.com/',
      URL_RANDOM: 'v1/gifs/random',
      URL_SEARCH: 'v1/gifs/search',
      LIMIT: 20,
    },
    image: null,
    loading: false,
    query: null,
  },
  created: function() {
    this.getRandomGif();
  }, 
  methods: {
    getRandomGif: _.debounce(    
     function() {
      this.loading = true;
        const randomUrl = 
                this.GIPHY_CONSTANTS.URL_BASE +
                this.GIPHY_CONSTANTS.URL_RANDOM +
                `?api_key=${this.GIPHY_CONSTANTS.GIPHY_SECRET}` +
                `&rating=g`;
        axios.get(randomUrl)
          .then((response) => {
            this.loading = false;
            this.image = response.data.data.image_original_url;
          })
          .catch((err) => this.loading = false)
      },
      1000),
    findGif: _.debounce(
                function() {
                  if (!this.query) { return; }
                  this.loading = true;
                  const searchUrl = 
                          this.GIPHY_CONSTANTS.URL_BASE +
                          this.GIPHY_CONSTANTS.URL_SEARCH +
                          `?api_key=${this.GIPHY_CONSTANTS.GIPHY_SECRET}` +
                          `&q=${this.query}` +
                          `&limit=${this.GIPHY_CONSTANTS.LIMIT}`;
                  axios.get(searchUrl)
                    .then((resp) => {
                      const random = _.random(0, this.GIPHY_CONSTANTS.LIMIT),
                            randomImage = 
                              resp.data.data[random]
                              .images.original.url;
                      this.loading = false;
                      this.image = randomImage;
                        
                    })
                    .catch(() => this.loading = false); 
                },
                500
              )
  },
})