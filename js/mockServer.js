var TestData = {};

TestData.longArray = [{
    title: 'First Block',
    images: ['img/img1.jpg', 'img/img3.jpg', 'img/img4.jpg']
  },
  {
    title: 'Second Block',
    images: ['img/img1.jpg', 'img/img2.jpg', 'img/img1.jpg', 'img/img4.jpg']
  },
  {
    title: 'Second Block',
    images: ['img/img3.jpg', 'img/img2.jpg', 'img/img1.jpg', 'img/img4.jpg']
  },
  {
    title: 'Second Block',
    images: ['img/img12.jpg', 'img/img4.jpg', 'img/img1.jpg', 'img/img4.jpg']
  },
  {
    title: 'Second Block',
    images: ['img/img11.jpg', 'img/img6.jpg', 'img/img11.jpg', 'img/img4.jpg']
  },
  {
    title: 'Second Block',
    images: ['img/img1.jpg', 'img/img7.jpg', 'img/img10.jpg', 'img/img12.jpg']
  },
  {
    title: 'Second Block',
    images: ['img/img1.jpg', 'img/img7.jpg', 'img/img5.jpg', 'img/img4.jpg']
  },
  {
    title: 'Second Block',
    images: ['img/img1.jpg', 'img/img6.jpg', 'img/img8.jpg', 'img/img9.jpg']
  },
  {
    title: 'Second Block',
    images: ['img/img1.jpg', 'img/img2.jpg', 'img/img6.jpg', 'img/img12.jpg']
  },
  {
    title: 'Second Block',
    images: ['img/img4.jpg', 'img/img1.jpg', 'img/img1.jpg', 'img/img4.jpg']
  },
  {
    title: 'Second Block',
    images: ['img/img5.jpg', 'img/img2.jpg', 'img/img1.jpg', 'img/img4.jpg']
  },
  {
    title: 'Second Block',
    images: ['img/img6.jpg', 'img/img7.jpg', 'img/img8.jpg', 'img/img9.jpg']
  }];

var MockServer = {};
window.MockServer = MockServer;
MockServer.init = function() {

  this.server = sinon.fakeServer.create();
  this.server.autoRespond = true;
  this.server.respondWith("GET", "/blocks",
                       [200, { "Content-Type": "application/json" },
                        JSON.stringify(TestData.longArray)]);
}

