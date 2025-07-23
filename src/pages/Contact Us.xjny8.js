// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixData from 'wix-data';

$w.onReady(function () {
  // Initial load of all FAQs
  wixData.query('Faq')
    .find()
    .then((res) => {
      $w('#faqRepeater').data = res.items;
    });

  // Filter FAQs by search input (question only)
  $w('#searchInput').onInput(() => {
    const query = $w('#searchInput').value.toLowerCase();

    wixData.query('Faq')
      .contains('question', query)
      .find()
      .then((res) => {
        $w('#faqRepeater').data = res.items;
      });
  });
// toggle on click
  $w('#faqRepeater').onItemReady(($item, itemData) => {
  // Set text
  $item('#faqQuestion').text = itemData.question;
  $item('#faqAnswer').text = itemData.answer;

  // Collapse answer initially
  $item('#answerBox').collapse();

  // ✅ Initial style for collapsed state
  $item('#questionBox').style.backgroundImage = ""; // remove gradient
  $item('#questionBox').style.backgroundColor = "#1C4EFF"; // solid blue

  // Toggle logic
  $item('#toggleIcon').onClick(() => {
  const isCollapsed = $item('#answerBox').collapsed;

  if (isCollapsed) {
    // Expand + Apply gradient background
    $item('#answerBox').expand()
      .then(() => {
        console.log("Expanded: applying gradient");
        $item('#questionBox').style.backgroundColor = ""; // clear solid
        $item('#questionBox').style.backgroundImage = "linear-gradient(to right, #AC7EF4 20%, #FFB957 85%, #FFCD61 100%)";
      })
      .catch((err) => console.error("Expand error:", err));
  } else {
    // Collapse + Apply solid blue
    $item('#answerBox').collapse()
      .then(() => {
        console.log("Collapsed: applying solid blue");
        $item('#questionBox').style.backgroundImage = ""; // clear gradient
        $item('#questionBox').style.backgroundColor = "#1C4EFF";
      })
      .catch((err) => console.error("Collapse error:", err));
  }
});



});
