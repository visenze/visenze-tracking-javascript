const va = require('./tracking/index');

// TODO: insert your tracking code here
tracker = va.init({ code: "test" })

// test click event
tracker.sendEvent("click", {
  name: "testclick",
  web_host: "test_webhost",
  test_data: "test",
  os: "fake_os"
}, err => {
  console.log("send testClick failed: ", err);
});
