(function() {
  var StellaDotApp = {};
  window.StellaDotApp = StellaDotApp;

  StellaDotApp.Block = Backbone.Model.extend({
    defaults: {
      title: null,
      images : []
    },
    getRandImage : function(){
      var images = this.get('images');
      var randIndex = Math.floor(Math.random()*images.length);
      return images[randIndex];
    }
  });

  StellaDotApp.Blocks = Backbone.Collection.extend({
    model : StellaDotApp.Block,
    url: '/blocks'
  });

  StellaDotApp.CarouselComponent = Backbone.View.extend({
    className: "carousel-container",
    template: _.template($("#carousel-template").html()),
    events: {
      "click .navigate-previous": "navigatePrevious",
      "click .navigate-next": "navigateNext"
    },
    initialize: function() {
      $(window).bind("resize.app", _.bind(this.render, this));
      
      this.numPages = this.count()/this.options.itemsPerPage;
      this.imageBordersWidth = this.options.itemsPerPage * 4;
    },
    getComponentWidth : function () {
      return this.count()*(this.imageWidth + 10);
    },
    count : function () {
      return this.collection.length;
    },
    navigatePrevious : function() {
      
      if(this.currentPage > 0) {
        this.currentPage -= 1;
        this.setTransformation();
        this.$el.find('.navigate-next').removeAttr('disabled');
      }

      if(this.currentPage == 0) {
        this.$el.find('.navigate-previous').attr('disabled','disabled');        
      }
    },
    navigateNext : function() {
      
      if(this.numPages > this.currentPage + 1) {
        this.currentPage += 1;
        this.setTransformation();
        this.$el.find('.navigate-previous').removeAttr('disabled');
      }
      
      if(this.numPages <= this.currentPage + 1){
        this.$el.find('.navigate-next').attr('disabled','disabled');
      }

      if(this.currentPage > this.maxNavigatedPage) {
        this.maxNavigatedPage = this.currentPage;
        this.lazyLoadPage();
      }
      
    },
    setTransformation: function() {
      
      var offset = this.currentPage * ((this.imageWidth) * this.options.itemsPerPage + this.imageBordersWidth);
      var maxOffset = (this.count() - this.options.itemsPerPage) * (this.imageWidth + this.imageBordersWidth/this.options.itemsPerPage);
      if(offset > maxOffset) {
        offset = maxOffset;
      }

      this.$el.find('ul.carousel-items-container').css('transform','translate3d(-'+offset+'px,0px,0px)');
    },
    lazyLoadPage : function() {
      if(this.numPages > this.options.numPagesLazyLoad) {
          var template = _.template($("#image-template").html());
          var imageWidth = this.imageWidth;
          this.$el.find('.carousel-items-container').append(template({
            items : this.collection.models.slice(this.options.numPagesLazyLoad*this.options.itemsPerPage,(this.options.numPagesLazyLoad+1)*this.options.itemsPerPage),
            imageWidth : this.imageWidth
          }));    
          this.options.numPagesLazyLoad+=1;
        }
    },
    render: function() {
      
      this.currentPage = 0;
      this.maxNavigatedPage = 0;
      this.imageWidth = ($(".container").innerWidth() - this.imageBordersWidth)/this.options.itemsPerPage;

      this.$el.html(this.template({
          items : this.collection.first(this.options.itemsPerPage * this.options.numPagesLazyLoad)
      }));

      if(this.count < this.options.itemsPerPage) {
        this.$el.find('.navigate-next').attr('disabled','disabled');
      }

      return this;
    }   
  });

  StellaDotApp.Index = Backbone.View.extend({
    initialize: function() {
      this.listBlocks = new StellaDotApp.Blocks();    
      this.listBlocks.on('all',this.render,this);
      this.listBlocks.fetch();
    },
    render: function() {
      
      this.$el.html('');
      
      var carouselComponent1 = new StellaDotApp.CarouselComponent({ collection : this.listBlocks, itemsPerPage : 4,numPagesLazyLoad:2});
      this.$el.append(carouselComponent1.render().el);

      return this;
    }    
  });

  StellaDotApp.Router = Backbone.Router.extend({
    initialize: function(options) {
      this.el = options.el
    },
    routes: {
      "": "index"
    },
    index: function() {
      var index = new StellaDotApp.Index();
      this.el.empty();
      this.el.append(index.render().el);
    }
  });

  StellaDotApp.init = function(container) {
    container = $(container);
    var router = new StellaDotApp.Router({el: container})
    Backbone.history.start();
  }
})()
