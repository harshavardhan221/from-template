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
  // Set content manually
  $item('#faqQuestion').text = itemData.question;
  $item('#faqAnswer').text = itemData.answer;

  // Start with answerBox collapsed 
  $item('#answerBox').collapse();
   console.log("Answer collapsed initially");

    // ✅ Show blue box initially, hide gradient box
    $item('#questionBoxBlue').show();
    $item('#questionBoxGradient').hide();

// Toggle on icon click
    $item('#toggleIcon').onClick(() => {
      const isCollapsed = $item('#answerBox').collapsed;

      if (isCollapsed) {
        // Expand + switch to gradient
        $item('#answerBox').expand()
          .then(() => {
            $item('#questionBoxBlue').hide();
            $item('#questionBoxGradient').show();
          });
      } else {
        // Collapse + switch to blue
        $item('#answerBox').collapse()
          .then(() => {
            $item('#questionBoxGradient').hide();
            $item('#questionBoxBlue').show();
          });
      }
    });

    $item('#toggleIcon2').onClick(() => {
      $item('#answerBox').collapse()
        .then(() => {
          $item('#questionBoxGradient').hide();
          $item('#questionBoxBlue').show();
        });
    });
  });

});
