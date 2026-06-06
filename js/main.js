// ===== Smooth Scroll for Navigation Links =====
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for all anchor links
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#" or modal trigger
      if (href === "#" || this.hasAttribute("data-bs-toggle")) {
        return;
      }

      e.preventDefault();

      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          if (typeof bootstrap !== "undefined" && bootstrap.Collapse) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
              toggle: true,
            });
          }
        }
      }
    });
  });

  // ===== Active Menu on Scroll =====
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    let current = "";
    const navbarHeight = document.querySelector(".navbar").offsetHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbarHeight - 50;
      const sectionHeight = section.offsetHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // ===== Back to Top Button =====
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ===== Reveal on Scroll Animation =====
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  // ===== Counter Animation for Metrics =====
  function animateCounter(element, target, duration = 1000, suffix = "") {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString("vi-VN") + suffix;
      }
    }

    updateCounter();
  }

  // Trigger counter animation when metrics section is visible
  const metricsSection = document.querySelector("#seller");

  if (metricsSection) {
    let animated = false;

    const observerOptions = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;

          const totalProducts = document.getElementById("totalProducts");
          const todayOrders = document.getElementById("todayOrders");
          const todayRevenue = document.getElementById("todayRevenue");
          const lowStock = document.getElementById("lowStock");

          if (totalProducts) animateCounter(totalProducts, 32);
          if (todayOrders) animateCounter(todayOrders, 7);
          if (todayRevenue) animateCounter(todayRevenue, 682000, 1000, "đ");
          if (lowStock) animateCounter(lowStock, 4);
        }
      });
    }, observerOptions);

    observer.observe(metricsSection);
  }

  // ===== Order Button Loading State & Modal Details Populating =====
  const btnPreorderTrigger = document.getElementById("btn-preorder-trigger");
  if (btnPreorderTrigger) {
    btnPreorderTrigger.addEventListener("click", function () {
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="bi bi-hourglass-split"></i> Đang tạo đơn...';
      this.disabled = true;

      setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;

        // Get current menu details from the DOM
        const currentTitle = document.getElementById("result-title").innerText;
        const currentPrice =
          document.getElementById("result-total-price").innerText;
        const currentSeller =
          document.getElementById("result-seller-name").innerText;

        // Generate dynamic details inside the modal
        const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

        document.getElementById("modal-order-id").innerText = orderId;
        document.getElementById("modal-order-title").innerText = currentTitle;
        document.getElementById("modal-order-price").innerText = currentPrice;
        document.getElementById("modal-order-seller").innerText = currentSeller;

        // Calculate estimated pickup time (e.g. current hour + 2 hours)
        const now = new Date();
        now.setHours(now.getHours() + 2);
        const minutesStr =
          now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
        document.getElementById("modal-order-time").innerText =
          now.getHours() + ":" + minutesStr + " hôm nay";
      }, 600);
    });
  }

  // ===== Interactive AI Simulator Logic =====
  const SIMULATOR_DATABASE = {
    "Bữa sáng": [
      {
        name: "Bún sườn mọc",
        suggestion:
          "Bún tươi dai ngon kết hợp sườn heo non ngọt nước và mọc giò sống viên tròn hấp dẫn.",
        seller: "Sạp Thực Phẩm Tươi Sống Cô Vy",
        reason:
          "Món ăn giàu dinh dưỡng, cung cấp đủ năng lượng cho ngày mới, sườn heo và mọc tự làm sạch sẽ.",
        items: [
          {
            name: "Sườn non heo",
            qtyPerPerson: 0.1,
            unit: "kg",
            pricePerUnit: 140000,
          },
          {
            name: "Mọc (giò sống)",
            qtyPerPerson: 0.05,
            unit: "kg",
            pricePerUnit: 120000,
          },
          {
            name: "Bún tươi",
            qtyPerPerson: 0.2,
            unit: "kg",
            pricePerUnit: 15000,
          },
          {
            name: "Rau thơm & hành lá",
            qtyPerPerson: 1,
            unit: "bó",
            pricePerUnit: 5000,
            fixed: true,
          },
        ],
      },
      {
        name: "Cháo sườn sụn hành hoa",
        suggestion:
          "Cháo gạo thơm dẻo ninh nhừ với sườn sụn heo giòn sần sật, ăn kèm quẩy giòn và hành lá.",
        seller: "Quầy Gạo & Đồ Khô Cô Xuân",
        reason:
          "Dễ tiêu hóa, phù hợp cho cả gia đình, sườn sụn giòn ngon ngọt tự nhiên từ xương heo.",
        items: [
          {
            name: "Sườn sụn heo",
            qtyPerPerson: 0.1,
            unit: "kg",
            pricePerUnit: 150000,
          },
          {
            name: "Quẩy giòn",
            qtyPerPerson: 1,
            unit: "túi",
            pricePerUnit: 5000,
            fixed: true,
          },
          {
            name: "Hành lá & gia vị",
            qtyPerPerson: 1,
            unit: "bó",
            pricePerUnit: 3000,
            fixed: true,
          },
        ],
      },
      {
        name: "Bún cá rô đồng",
        suggestion:
          "Bún cá rô đồng phi lê rán vàng giòn riêu thanh mát ngọt bùi ăn kèm thì là hành ngò.",
        seller: "Sạp Cá Đồng Chú Sáu",
        reason:
          "Cá rô đồng tươi ngon giàu đạm lành tính xào thơm nấu canh thì là mát ruột đưa bún.",
        items: [
          {
            name: "Cá rô đồng phi lê",
            qtyPerPerson: 0.2,
            unit: "kg",
            pricePerUnit: 120000,
          },
          {
            name: "Bún tươi sạch",
            qtyPerPerson: 0.2,
            unit: "kg",
            pricePerUnit: 15000,
          },
          {
            name: "Rau cải & thì là",
            qtyPerPerson: 1,
            unit: "bó",
            pricePerUnit: 5000,
            fixed: true,
          },
        ],
      },
    ],
    "Bữa trưa": [
      {
        name: "Cơm sườn rim chua ngọt",
        suggestion:
          "Cơm tấm nóng hổi kết hợp sườn rim chua ngọt đưa cơm xào hành tỏi dưa leo.",
        seller: "Sạp Thực Phẩm Tươi Sống Cô Vy",
        reason:
          "Sườn non heo ngon rim sốt chua ngọt đậm vị truyền thống giàu đạm hấp dẫn trôi cơm.",
        items: [
          {
            name: "Sườn cốt lết heo",
            qtyPerPerson: 0.15,
            unit: "kg",
            pricePerUnit: 110000,
          },
          {
            name: "Cà chua chín",
            qtyPerPerson: 0.1,
            unit: "kg",
            pricePerUnit: 25000,
          },
          {
            name: "Dưa leo sạch",
            qtyPerPerson: 0.1,
            unit: "kg",
            pricePerUnit: 20000,
          },
          {
            name: "Hành tỏi gia vị",
            qtyPerPerson: 1,
            unit: "phần",
            pricePerUnit: 5000,
            fixed: true,
          },
        ],
      },
      {
        name: "Cơm cá hú kho tộ & canh cải",
        suggestion:
          "Cá hú kho tộ sền sệt béo ngậy ăn với canh rau cải ngọt nấu thịt bằm thanh mát.",
        seller: "Vựa Cá Sông Mekong - Anh Ba",
        reason:
          "Cá hú béo ngậy kho tộ đậm đà đưa cơm ăn kèm canh cải ngọt nóng hổi bổ sung chất xơ.",
        items: [
          {
            name: "Cá hú tươi cắt lát",
            qtyPerPerson: 0.15,
            unit: "kg",
            pricePerUnit: 85000,
          },
          {
            name: "Thịt ba chỉ heo",
            qtyPerPerson: 0.05,
            unit: "kg",
            pricePerUnit: 130000,
          },
          {
            name: "Rau cải ngọt",
            qtyPerPerson: 0.15,
            unit: "kg",
            pricePerUnit: 25000,
          },
        ],
      },
      {
        name: "Cơm thịt ba chỉ luộc & canh rau muống",
        suggestion:
          "Thịt ba chỉ luộc chín mềm ăn kèm cà pháo muối giòn và canh rau muống luộc vắt chanh.",
        seller: "Gian hàng Thực Phẩm Cô Lan",
        reason:
          "Món ăn dân dã mát ruột cho ngày hè, thịt heo ba chỉ beo béo ăn cùng cà pháo chua giòn.",
        items: [
          {
            name: "Thịt ba chỉ ngon",
            qtyPerPerson: 0.15,
            unit: "kg",
            pricePerUnit: 130000,
          },
          {
            name: "Rau muống non",
            qtyPerPerson: 1,
            unit: "bó",
            pricePerUnit: 12000,
            fixed: true,
          },
          {
            name: "Cà pháo muối",
            qtyPerPerson: 1,
            unit: "bát",
            pricePerUnit: 5000,
            fixed: true,
          },
        ],
      },
    ],
    "Bữa tối": [
      {
        name: "Thịt bằm sốt cà & Đậu hũ chiên",
        suggestion:
          "Thịt heo xay sốt cà chua đậm đà, đậu hũ chiên giòn và canh rau muống tỏi.",
        seller: "Gian hàng Thực Phẩm Cô Lan",
        reason:
          "Bữa ăn ấm cúng đủ chất với vị chua ngọt tự nhiên của cà chua, đạm dồi dào từ thịt heo và đậu hũ.",
        items: [
          {
            name: "Thịt heo xay",
            qtyPerPerson: 0.18,
            unit: "kg",
            pricePerUnit: 90000,
          },
          {
            name: "Cà chua chín",
            qtyPerPerson: 0.1,
            unit: "kg",
            pricePerUnit: 25000,
          },
          {
            name: "Rau muống non",
            qtyPerPerson: 1,
            unit: "bó",
            pricePerUnit: 12000,
            fixed: true,
          },
          {
            name: "Đậu hũ trắng",
            qtyPerPerson: 1.5,
            unit: "miếng",
            pricePerUnit: 5000,
          },
          {
            name: "Gạo thơm dẻo",
            qtyPerPerson: 0.15,
            unit: "kg",
            pricePerUnit: 18000,
          },
          {
            name: "Gia vị hành tỏi",
            qtyPerPerson: 1,
            unit: "phần",
            pricePerUnit: 5000,
            fixed: true,
          },
        ],
      },
      {
        name: "Cá diêu hồng chiên xù & canh chua",
        suggestion:
          "Cá diêu hồng tươi chiên giòn cuốn rau sống chấm nước mắm tỏi ớt kèm bát canh chua dọc mùng thanh nhiệt.",
        seller: "Gian hàng Thực Phẩm Cô Lan",
        reason:
          "Món cá diêu hồng giàu dinh dưỡng, ăn kèm canh chua bạc hà mát lành cho bữa cơm tối gia đình.",
        items: [
          {
            name: "Cá diêu hồng tươi",
            qtyPerPerson: 0.3,
            unit: "kg",
            pricePerUnit: 75000,
          },
          {
            name: "Đồ nấu canh chua",
            qtyPerPerson: 1,
            unit: "phần",
            pricePerUnit: 20000,
            fixed: true,
          },
          {
            name: "Rau sống ăn kèm",
            qtyPerPerson: 1,
            unit: "phần",
            pricePerUnit: 10000,
            fixed: true,
          },
          {
            name: "Gạo thơm dẻo",
            qtyPerPerson: 0.15,
            unit: "kg",
            pricePerUnit: 18000,
          },
        ],
      },
      {
        name: "Thịt gà kho sả ớt & canh bí đỏ",
        suggestion:
          "Thịt gà góc đùi ta xào sả ớt cay thơm đậm đà dọn kèm bát canh bí đỏ nấu thịt bằm.",
        seller: "Sạp Gà Ta Cô Tám",
        reason:
          "Thịt gà xào đậm đà đưa cơm kết hợp canh bí đỏ bổ dưỡng, giúp cả nhà bồi bổ sức khỏe tối nay.",
        items: [
          {
            name: "Đùi gà công nghiệp",
            qtyPerPerson: 0.2,
            unit: "kg",
            pricePerUnit: 65000,
          },
          {
            name: "Bí đỏ tươi",
            qtyPerPerson: 0.15,
            unit: "kg",
            pricePerUnit: 25000,
          },
          {
            name: "Thịt heo xay (canh)",
            qtyPerPerson: 0.05,
            unit: "kg",
            pricePerUnit: 90000,
          },
          {
            name: "Gạo thơm dẻo",
            qtyPerPerson: 0.15,
            unit: "kg",
            pricePerUnit: 18000,
          },
          {
            name: "Sả & ớt bằm",
            qtyPerPerson: 1,
            unit: "phần",
            pricePerUnit: 5000,
            fixed: true,
          },
        ],
      },
    ],
    "Bữa sinh viên/tiết kiệm": [
      {
        name: "Đậu hũ sốt cà & Canh trứng",
        suggestion:
          "Đậu hũ chiên sốt cà chua hành lá thơm ngậy cùng bát canh trứng cà chua thơm lừng.",
        seller: "Cửa Hàng Rau Sạch Cô Năm",
        reason:
          "Chi phí cực thấp nhưng cung cấp đầy đủ dinh dưỡng cơ bản. Phù hợp tuyệt vời cho ví tiền sinh viên.",
        items: [
          {
            name: "Đậu hũ trắng",
            qtyPerPerson: 2,
            unit: "miếng",
            pricePerUnit: 5000,
          },
          {
            name: "Trứng gà ta",
            qtyPerPerson: 1,
            unit: "quả",
            pricePerUnit: 3500,
          },
          {
            name: "Cà chua chín",
            qtyPerPerson: 0.1,
            unit: "kg",
            pricePerUnit: 20000,
          },
        ],
      },
      {
        name: "Trứng rán hành & Canh rau muống",
        suggestion:
          "Trứng chiên hành lá thơm lừng ăn kèm canh rau muống luộc mát ruột đưa cơm.",
        seller: "Cửa Hàng Rau Sạch Cô Năm",
        reason:
          "Món ăn quốc dân dễ nấu, rẻ mà ngon, cung cấp đủ đạm trứng và chất xơ từ rau muống.",
        items: [
          {
            name: "Trứng gà ta",
            qtyPerPerson: 2,
            unit: "quả",
            pricePerUnit: 3500,
          },
          {
            name: "Rau muống non",
            qtyPerPerson: 1,
            unit: "bó",
            pricePerUnit: 10000,
            fixed: true,
          },
        ],
      },
      {
        name: "Cơm thịt heo xào hành tây",
        suggestion:
          "Thịt heo xào hành tây giòn ngọt thơm lừng tiêu sọ dùng nóng cùng cơm tẻ.",
        seller: "Gian hàng Thực Phẩm Cô Lan",
        reason:
          "Thịt nạc heo giàu dinh dưỡng xào hành tây giòn ngọt thơm ngon kích thích vị giác với giá sinh viên.",
        items: [
          {
            name: "Thịt nạc vai heo",
            qtyPerPerson: 0.1,
            unit: "kg",
            pricePerUnit: 80000,
          },
          {
            name: "Hành tây & hành lá",
            qtyPerPerson: 1,
            unit: "phần",
            pricePerUnit: 5000,
            fixed: true,
          },
        ],
      },
    ],
    "Bữa healthy": [
      {
        name: "Salad ức gà áp chảo sốt mè",
        suggestion:
          "Ức gà áp chảo xé sợi trộn rau xà lách Romaine, dưa leo, cà chua bi kết hợp nước sốt mè rang béo nhẹ.",
        seller: "Nông Sản Sạch Đà Lạt Gia Nghĩa",
        reason:
          "Thực đơn chuẩn Eat Clean giàu protein ít calo giúp giữ dáng, săn cơ khỏe khoắn.",
        items: [
          {
            name: "Ức gà phi lê sạch",
            qtyPerPerson: 0.2,
            unit: "kg",
            pricePerUnit: 75000,
          },
          {
            name: "Xà lách Romaine",
            qtyPerPerson: 0.1,
            unit: "kg",
            pricePerUnit: 45000,
          },
          {
            name: "Cà chua bi ngọt",
            qtyPerPerson: 0.08,
            unit: "kg",
            pricePerUnit: 45000,
          },
          {
            name: "Sốt mè rang Kewpie",
            qtyPerPerson: 1,
            unit: "gói",
            pricePerUnit: 7000,
          },
        ],
      },
      {
        name: "Bún lứt tôm sú xào bông cải",
        suggestion:
          "Bún gạo lứt luộc trộn tôm sú bóc vỏ xào bông cải xanh giòn ngọt đầy đủ vitamin.",
        seller: "Thủy Hải Sản Cao Cấp Tươi Sạch",
        reason:
          "Bữa ăn lành mạnh giàu xơ, tinh bột tốt từ gạo lứt và protein ngọt tự nhiên từ tôm sú tươi.",
        items: [
          {
            name: "Tôm sú tươi ngon",
            qtyPerPerson: 0.12,
            unit: "kg",
            pricePerUnit: 220000,
          },
          {
            name: "Bún gạo lứt khô",
            qtyPerPerson: 0.08,
            unit: "kg",
            pricePerUnit: 40000,
          },
          {
            name: "Bông cải & ớt chuông",
            qtyPerPerson: 0.15,
            unit: "kg",
            pricePerUnit: 50000,
          },
          {
            name: "Dầu ô liu xào",
            qtyPerPerson: 1,
            unit: "phần",
            pricePerUnit: 4000,
            fixed: true,
          },
        ],
      },
      {
        name: "Cá hồi áp chảo sốt cam",
        suggestion:
          "Cá hồi phi lê áp chảo chín tới thơm mềm sốt cam vắt nguyên chất dọn kèm măng tây xào tỏi.",
        seller: "Cửa Hàng Thực Phẩm Nhập Khẩu GreenFoods",
        reason:
          "Cung cấp chất béo tốt Omega-3 cho tim mạch từ cá hồi tươi sạch và măng tây giàu xơ, kali.",
        items: [
          {
            name: "Phi lê cá hồi tươi",
            qtyPerPerson: 0.12,
            unit: "kg",
            pricePerUnit: 380000,
          },
          {
            name: "Cam sành vắt nước",
            qtyPerPerson: 0.5,
            unit: "quả",
            pricePerUnit: 4000,
          },
          {
            name: "Măng tây sạch",
            qtyPerPerson: 0.08,
            unit: "kg",
            pricePerUnit: 90000,
          },
        ],
      },
    ],
  };

  // State object to hold active simulation settings
  let currentSimulation = {
    mealType: "Bữa tối",
    peopleCount: 3,
    budgetLimit: 100000,
    activeOptionIdx: 0,
    options: [],
  };

  // Dynamic rounding helper for quantities
  function calculateQuantity(item, peopleCount) {
    if (item.fixed) return item.qtyPerPerson;
    const raw = item.qtyPerPerson * peopleCount;
    if (
      ["quả", "miếng", "cuộn", "ổ", "gói", "túi", "cây", "chén", "bó"].includes(
        item.unit,
      )
    ) {
      return Math.ceil(raw);
    }
    return Math.round(raw * 100) / 100;
  }

  // Helper to calculate the total cost of an option
  function getOptionTotalCost(option, peopleCount) {
    let totalCost = 0;
    option.items.forEach((item) => {
      const qty = calculateQuantity(item, peopleCount);
      totalCost += qty * item.pricePerUnit;
    });
    return totalCost;
  }

  // Function to render the active dynamic suggestion
  function renderActiveSuggestion() {
    const { peopleCount, budgetLimit, activeOptionIdx, options } =
      currentSimulation;
    if (!options || options.length === 0) return;
    const option = options[activeOptionIdx];

    let totalCost = 0;
    let tableRowsHtml = "";

    option.items.forEach((item) => {
      const qty = calculateQuantity(item, peopleCount);
      const cost = qty * item.pricePerUnit;
      totalCost += cost;

      const qtyStr = qty.toLocaleString("vi-VN");
      const unitPriceStr =
        item.pricePerUnit.toLocaleString("vi-VN") + "đ/" + item.unit;
      const costStr = cost.toLocaleString("vi-VN") + "đ";

      tableRowsHtml += `<tr>
                <td>${item.name}</td>
                <td>${qtyStr} ${item.unit}</td>
                <td>${unitPriceStr}</td>
                <td class="fw-bold">${costStr}</td>
            </tr>`;
    });

    tableRowsHtml += `<tr class="total-row">
            <td colspan="3">Tổng cộng</td>
            <td class="fw-bold">${totalCost.toLocaleString("vi-VN")}đ</td>
        </tr>`;

    // Update basic suggestions UI
    document.getElementById("result-title").innerHTML =
      `<i class="bi bi-check-circle-fill text-success"></i> ${currentSimulation.mealType} ${peopleCount} người: ${option.name}`;
    document.getElementById("result-suggestion").innerText = option.suggestion;
    document.getElementById("result-total-price").innerText =
      totalCost.toLocaleString("vi-VN") + "đ";
    document.getElementById("result-budget-limit").innerText =
      budgetLimit.toLocaleString("vi-VN") + "đ";
    document.getElementById("result-table-body").innerHTML = tableRowsHtml;
    document.getElementById("result-seller-name").innerText = option.seller;

    // Dynamic recommendation reason
    const diff = budgetLimit - totalCost;
    const ratio = ((totalCost / budgetLimit) * 100).toFixed(1);
    let customReason = option.reason;
    if (diff >= 0) {
      customReason += ` Thực đơn này sử dụng ${totalCost.toLocaleString("vi-VN")}đ (chiếm ${ratio}% ngân sách), giúp bạn tiết kiệm được ${diff.toLocaleString("vi-VN")}đ so với hạn mức đề ra.`;
    } else {
      customReason += ` Cảnh báo: Chi phí nguyên liệu thực tế là ${totalCost.toLocaleString("vi-VN")}đ (chiếm ${ratio}% ngân sách), đã vượt quá hạn mức ngân sách của bạn là ${budgetLimit.toLocaleString("vi-VN")}đ.`;
    }
    document.getElementById("result-reason").innerText = customReason;

    // Progress bar states
    const progressFill = document.getElementById("result-progress-fill");
    const progressPercent = document.getElementById("result-progress-percent");
    const ratioClamped = Math.min(ratio, 100);

    if (progressFill) {
      progressFill.style.width = ratioClamped + "%";
      if (totalCost > budgetLimit) {
        progressFill.classList.add("exceeded");
      } else {
        progressFill.classList.remove("exceeded");
      }
    }
    if (progressPercent) {
      progressPercent.innerText = `Sử dụng ${ratio}% ngân sách`;
      if (totalCost > budgetLimit) {
        progressPercent.classList.add("exceeded");
      } else {
        progressPercent.classList.remove("exceeded");
      }
    }

    // Verification badges warning styling
    const verificationBadgesContainer = document.querySelector(
      ".verification-badges",
    );
    if (verificationBadgesContainer) {
      if (totalCost > budgetLimit) {
        verificationBadgesContainer.innerHTML = `
                    <div class="verify-badge exceeded"><i class="bi bi-exclamation-triangle-fill"></i> Vượt hạn mức</div>
                    <div class="verify-badge"><i class="bi bi-people-fill"></i> Đủ khẩu phần</div>
                `;
      } else {
        verificationBadgesContainer.innerHTML = `
                    <div class="verify-badge"><i class="bi bi-shield-check"></i> Không vượt ngân sách</div>
                    <div class="verify-badge"><i class="bi bi-people-fill"></i> Đủ khẩu phần</div>
                `;
      }
    }
  }

  // Function to render suggestion tabs
  function renderOptionTabs() {
    const container = document.getElementById("option-tabs-container");
    if (!container) return;

    let tabsHtml = "";
    currentSimulation.options.forEach((opt, idx) => {
      const activeClass =
        idx === currentSimulation.activeOptionIdx ? "active" : "";
      tabsHtml += `<button class="btn btn-outline-success btn-sm option-tab ${activeClass}" data-option-idx="${idx}">Gợi ý ${idx + 1}</button>`;
    });
    container.innerHTML = tabsHtml;

    // Add event listeners to tabs
    const tabs = container.querySelectorAll(".option-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        tabs.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");

        const idx = parseInt(this.getAttribute("data-option-idx"));
        currentSimulation.activeOptionIdx = idx;
        renderActiveSuggestion();
      });
    });
  }

  // Function to run simulation flow
  function startMenuSimulation(mealType, peopleCount, budgetLimit) {
    // Populates the state object
    currentSimulation.mealType = mealType;
    currentSimulation.peopleCount = peopleCount;
    currentSimulation.budgetLimit = budgetLimit;
    currentSimulation.activeOptionIdx = 0;

    // Filter options to only those that do not exceed the budget
    let options = SIMULATOR_DATABASE[mealType] || [];
    let filteredOptions = options.filter((opt) => {
      return getOptionTotalCost(opt, peopleCount) <= budgetLimit;
    });

    // Fill up to 3 options by scanning other categories
    if (filteredOptions.length < 3) {
      const keys = Object.keys(SIMULATOR_DATABASE);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key === mealType) continue; // already processed
        const otherOptions = SIMULATOR_DATABASE[key] || [];
        for (let j = 0; j < otherOptions.length; j++) {
          const opt = otherOptions[j];
          const isDuplicate = filteredOptions.some(
            (item) => item.name === opt.name,
          );
          if (!isDuplicate) {
            const cost = getOptionTotalCost(opt, peopleCount);
            if (cost <= budgetLimit) {
              filteredOptions.push(opt);
              if (filteredOptions.length >= 3) break;
            }
          }
        }
        if (filteredOptions.length >= 3) break;
      }
    }

    // Absolute fallback: if no options are under budget, show the cheapest overall
    if (filteredOptions.length === 0) {
      let cheapestOption = null;
      let cheapestCost = Infinity;
      Object.keys(SIMULATOR_DATABASE).forEach((key) => {
        (SIMULATOR_DATABASE[key] || []).forEach((opt) => {
          const cost = getOptionTotalCost(opt, peopleCount);
          if (cost < cheapestCost) {
            cheapestCost = cost;
            cheapestOption = opt;
          }
        });
      });
      if (cheapestOption) {
        filteredOptions.push(cheapestOption);
      } else {
        filteredOptions = SIMULATOR_DATABASE[mealType] || [];
      }
    }

    currentSimulation.options = filteredOptions;

    // Show overlay on result card
    const overlay = document.getElementById("sim-loading-overlay");
    if (overlay) overlay.classList.remove("d-none");

    // Reset step states
    const steps = [
      document.getElementById("sim-step-1"),
      document.getElementById("sim-step-2"),
      document.getElementById("sim-step-3"),
    ];
    const icons = [
      document.getElementById("icon-step-1"),
      document.getElementById("icon-step-2"),
      document.getElementById("icon-step-3"),
    ];

    steps.forEach((step) => {
      if (step) step.classList.remove("active", "done");
    });
    icons.forEach((icon) => {
      if (icon) {
        icon.innerHTML = '<i class="bi bi-circle"></i>';
        icon.className = "sim-step-icon text-muted me-2";
      }
    });

    // Set parsing badge initial state
    const parsedBadge = document.getElementById("ai-parsed-badge");
    if (parsedBadge) parsedBadge.innerText = "Chờ...";

    // Step 1: Active
    setTimeout(() => {
      if (steps[0]) steps[0].classList.add("active");
      if (icons[0]) {
        icons[0].innerHTML = '<i class="bi bi-arrow-repeat"></i>';
        icons[0].className = "sim-step-icon me-2 text-primary";
      }

      // Step 1 Done, Step 2 Active
      setTimeout(() => {
        if (steps[0]) {
          steps[0].classList.remove("active");
          steps[0].classList.add("done");
        }
        if (icons[0]) {
          icons[0].innerHTML =
            '<i class="bi bi-check-circle-fill text-success"></i>';
          icons[0].className = "sim-step-icon me-2 text-success";
        }
        if (parsedBadge) {
          const budgetFormatted = budgetLimit / 1000 + "k";
          parsedBadge.innerText = `${budgetFormatted}, ${peopleCount} người, ${mealType}`;
        }

        setTimeout(() => {
          if (steps[1]) steps[1].classList.add("active");
          if (icons[1]) {
            icons[1].innerHTML = '<i class="bi bi-arrow-repeat"></i>';
            icons[1].className = "sim-step-icon me-2 text-primary";
          }

          // Step 2 Done, Step 3 Active
          setTimeout(() => {
            if (steps[1]) {
              steps[1].classList.remove("active");
              steps[1].classList.add("done");
            }
            if (icons[1]) {
              icons[1].innerHTML =
                '<i class="bi bi-check-circle-fill text-success"></i>';
              icons[1].className = "sim-step-icon me-2 text-success";
            }

            setTimeout(() => {
              if (steps[2]) steps[2].classList.add("active");
              if (icons[2]) {
                icons[2].innerHTML = '<i class="bi bi-arrow-repeat"></i>';
                icons[2].className = "sim-step-icon me-2 text-primary";
              }

              // Step 3 Done, Render results
              setTimeout(() => {
                if (steps[2]) {
                  steps[2].classList.remove("active");
                  steps[2].classList.add("done");
                }
                if (icons[2]) {
                  icons[2].innerHTML =
                    '<i class="bi bi-check-circle-fill text-success"></i>';
                  icons[2].className = "sim-step-icon me-2 text-success";
                }

                // Render suggestion details
                renderOptionTabs();
                renderActiveSuggestion();

                // Hide overlay
                if (overlay) overlay.classList.add("d-none");
              }, 800);
            }, 200);
          }, 800);
        }, 200);
      }, 800);
    }, 200);
  }

  // Set up preset buttons click handler
  const presetBtns = document.querySelectorAll(".preset-btn");
  presetBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      presetBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const presetKey = this.getAttribute("data-preset");
      let budget = 130000;
      let people = 3;
      let meal = "Bữa tối";

      if (presetKey === "55k") {
        budget = 55000;
        people = 2;
        meal = "Bữa sáng";
      } else if (presetKey === "90k") {
        budget = 90000;
        people = 3;
        meal = "Bữa trưa";
      } else if (presetKey === "130k") {
        budget = 130000;
        people = 3;
        meal = "Bữa tối";
      } else if (presetKey === "45k") {
        budget = 45000;
        people = 2;
        meal = "Bữa sinh viên/tiết kiệm";
      } else if (presetKey === "120k") {
        budget = 120000;
        people = 2;
        meal = "Bữa healthy";
      }

      // Trigger simulation
      startMenuSimulation(meal, people, budget);
    });
  });

  // Run initial simulation on load matching default values (130k, 3 people, Bữa tối)
  startMenuSimulation("Bữa tối", 3, 130000);

  // ===== Real-time Order Simulator Feed & SellerAIInsights =====

  // Order templates matching the Vietnamese context and specific store sections
  const ORDER_TEMPLATES = [
    {
      customer: "Nguyễn Thị Hòa",
      shop: "Thịt Sạch Cô Vy",
      items: "0.5kg đùi gà tỏi tươi",
      price: 45000,
    },
    {
      customer: "Vũ Thị Linh",
      shop: "Thịt Sạch Cô Vy",
      items: "Combo ba chỉ lợn nướng, 1 bó xà lách",
      price: 87000,
    },
    {
      customer: "Hoàng Anh Tuấn",
      shop: "Thịt Sạch Cô Vy",
      items: "1.2kg sườn heo non sạch",
      price: 168000,
    },
    {
      customer: "Lê Văn Bình",
      shop: "Thịt Sạch Cô Vy",
      items: "Combo ba chỉ heo và sườn sụn nướng",
      price: 108000,
    },
    {
      customer: "Phạm Minh Cường",
      shop: "Thịt Sạch Cô Vy",
      items: "0.5kg thịt heo xay tươi ngon",
      price: 57000,
    },
    {
      customer: "Trần Thanh Ngọc",
      shop: "Thịt Sạch Cô Vy",
      items: "1kg xương ống heo ngọt nước",
      price: 65000,
    },
    {
      customer: "Đặng Hồng Phương",
      shop: "Thịt Sạch Cô Vy",
      items: "0.8kg thịt nạc vai heo sạch",
      price: 96000,
    },
    {
      customer: "Bùi Quang Dũng",
      shop: "Thịt Sạch Cô Vy",
      items: "0.5kg ba chỉ heo giòn ngon",
      price: 75000,
    },
    {
      customer: "Ngô Quốc Tùng",
      shop: "Thịt Sạch Cô Vy",
      items: "0.6kg sườn sụn heo giòn sần sật",
      price: 90000,
    },
    {
      customer: "Lý Mỹ Duyên",
      shop: "Thịt Sạch Cô Vy",
      items: "1kg thịt đùi heo tươi",
      price: 120000,
    },
  ];

  let currentRevenue = 682000;
  let currentOrdersCount = 7;

  function updateDashboardMetrics(price) {
    currentRevenue += price;
    currentOrdersCount += 1;

    const revenueEl = document.getElementById("todayRevenue");
    const ordersEl = document.getElementById("todayOrders");

    if (revenueEl) {
      revenueEl.textContent = currentRevenue.toLocaleString("vi-VN") + "đ";
    }
    if (ordersEl) {
      ordersEl.textContent = currentOrdersCount.toString();
    }
  }

  function simulateNewOrder() {
    const container = document.getElementById("recent-orders-container");
    if (!container) return;

    // Pick random template
    const template =
      ORDER_TEMPLATES[Math.floor(Math.random() * ORDER_TEMPLATES.length)];

    // Create element with order-item-simulation class
    const orderEl = document.createElement("div");
    orderEl.className =
      "order-item-simulation py-2 border-bottom d-flex align-items-center justify-content-between";
    orderEl.innerHTML = `
      <div class="order-details-left min-w-0">
        <div class="fw-bold text-truncate text-dark" style="font-size: 0.9rem;">${template.customer}</div>
        <div class="text-muted text-truncate" style="font-size: 0.8rem;">${template.items}</div>
      </div>
      <div class="order-details-right text-end flex-shrink-0 ps-2">
        <div class="fw-bold text-success" style="font-size: 0.9rem;">${template.price.toLocaleString("vi-VN")}đ</div>
        <div class="text-muted small" style="font-size: 0.75rem;">Vừa xong</div>
      </div>
    `;

    // Insert at top
    container.insertBefore(orderEl, container.firstChild);

    // Update relative times of other orders
    const items = container.querySelectorAll(".order-item-simulation");
    items.forEach((item, index) => {
      if (index === 0) return; // Keep "Vừa xong" for the newest order

      const timeEl = item.querySelector(".order-details-right .text-muted");
      if (timeEl) {
        timeEl.textContent = `${index * 2} phút trước`;
      }
    });

    // Remove old orders if feed is too long
    if (items.length > 4) {
      container.removeChild(items[items.length - 1]);
    }

    // Apply border bottom styling dynamically
    const updatedItems = container.querySelectorAll(".order-item-simulation");
    updatedItems.forEach((item, index) => {
      if (index === updatedItems.length - 1) {
        item.classList.remove("border-bottom");
      } else {
        if (!item.classList.contains("border-bottom")) {
          item.classList.add("border-bottom");
        }
      }
    });

    // Update metrics
    updateDashboardMetrics(template.price);
  }

  // Start the order simulation loop (every 15 seconds)
  setInterval(simulateNewOrder, 15000);
  console.log("Chợ AI Local - Landing Page Loaded Successfully!");
});
