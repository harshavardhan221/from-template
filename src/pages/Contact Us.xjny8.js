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

  
  // Accordion toggle setup
  // Accordion toggle setup
  $w('#faqRepeater').onItemReady(($item, itemData) => {
  // Set collapse-header-gradient manually
  $item('#faqQuestion').text = itemData.question;
  $item('#faqAnswer').text = itemData.answer;

  // Start with content collapsed 
  $item('#content').collapse();
   console.log("Answer collapsed initially");

    // ✅ Show blue box initially, hide gradient box
    $item('#collapse-header-blue').expand();
    $item('#collapse-header-gradient').collapse();

// Toggle on icon click
    $item('#toggleIcon').onClick(() => {
      const isCollapsed = $item('#content').collapsed;

      if (isCollapsed) {
        // Expand + switch to gradient
        $item('#content').expand()
          .then(() => {
            $item('#collapse-header-blue').collapse();
            $item('#collapse-header-gradient').expand();
          });
      } else {
        // Collapse + switch to blue
        $item('#content').collapse()
          .then(() => {
            $item('#collapse-header-gradient').collapse();
            $item('#collapse-header-blue').expand();
          });
      }
    });

    $item('#toggleIcon2').onClick(() => {
      $item('#content').collapse()
        .then(() => {
          $item('#collapse-header-gradient').collapse();
          $item('#collapse-header-blue').expand();
        });
    });
  });
});
