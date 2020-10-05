const va = require('./tracking/index');

// TODO: insert your tracking code here
tracker = va.init({ code: "YOUR_TRACKER_CODE" })

// test click event
tracker.sendEvent("click", {
  name: "testclick",
  web_host: "test_webhost",
  test_data: "test",
  os: "fake_os"
}, success => {
  console.log(success);
}, err => {
  console.error("send testClick failed: ", err);
});
