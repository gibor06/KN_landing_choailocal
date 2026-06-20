// ===== Smooth Scroll for Navigation Links =====
document.addEventListener("DOMContentLoaded", function () {
  // ===== Translation Helper =====
  const TRANSLATIONS = {
    "Tổng cộng": "Total",
    "Gợi ý": "Option",
    "Sử dụng": "Using",
    "ngân sách": "of budget",
    "Không vượt ngân sách": "Within budget",
    "Đủ khẩu phần": "Adequate portions",
    "Vượt hạn mức": "Over budget",
    "Chờ...": "Waiting...",
    "người": "people",
    "Vừa xong": "Just now",
    "phút trước": "mins ago",
    "hôm nay": "today",
    "ngày mai": "tomorrow",
    "Đang tạo đơn...": "Creating order...",
    "Vui lòng nhập nhu cầu của bạn!": "Please enter your request!",
    "⏰ Vui lòng chọn ngày và giờ nhận hàng!": "⏰ Please select pickup date and time!",
    "⚠️ Thời gian nhận hàng phải ở tương lai.": "⚠️ Pickup time must be in the future.",
    "Vui lòng chọn thời gian khác!": "Please select a different time!",
    "chiếm": "using",
    "giúp bạn tiết kiệm được": "saving you",
    "so với hạn mức đề ra.": "compared to your budget.",
    "Cảnh báo: Chi phí nguyên liệu thực tế là": "Warning: Actual ingredient cost is",
    "đã vượt quá hạn mức ngân sách của bạn là": "which exceeds your budget of",
    "Thực đơn này sử dụng": "This menu uses",
    "Đã tìm": "Searched",
    "cho": "for",
    "Bữa sáng": "Breakfast",
    "Bữa trưa": "Lunch",
    "Bữa tối": "Dinner",
    "Bữa sinh viên/tiết kiệm": "Student/Budget Meal",
    "Bữa healthy": "Healthy Meal",
  };

  function t(text) {
    const lang = localStorage.getItem("lang") || "vi";
    if (lang === "en" && TRANSLATIONS[text]) return TRANSLATIONS[text];
    return text;
  }

  function getLang() {
    return localStorage.getItem("lang") || "vi";
  }
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
        element.textContent = target.toLocaleString(getLang() === "en" ? "en-US" : "vi-VN") + suffix;
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

  // Initialize pickup date and time with default values
  function initializePickupDateTime() {
    const pickupDateInput = document.getElementById("pickup-date");
    const pickupTimeSelect = document.getElementById("pickup-time");

    if (pickupDateInput) {
      // Set default date to today
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      pickupDateInput.value = `${year}-${month}-${day}`;

      // Set minimum date to today
      pickupDateInput.min = `${year}-${month}-${day}`;

      // Set maximum date to 7 days from now
      const maxDate = new Date(today);
      maxDate.setDate(maxDate.getDate() + 7);
      const maxYear = maxDate.getFullYear();
      const maxMonth = String(maxDate.getMonth() + 1).padStart(2, '0');
      const maxDay = String(maxDate.getDate()).padStart(2, '0');
      pickupDateInput.max = `${maxYear}-${maxMonth}-${maxDay}`;
    }

    if (pickupTimeSelect) {
      // Set default time to 15 minutes from now (remove 2 hours constraint for placement time suggestion)
      const now = new Date();
      const futureTime = new Date(now.getTime() + 15 * 60 * 1000);
      const hours = futureTime.getHours();

      // Find closest available time slot
      const timeOptions = pickupTimeSelect.querySelectorAll('option');
      let closestTime = '17:00'; // default

      timeOptions.forEach(option => {
        if (option.value) {
          const optionHour = parseInt(option.value.split(':')[0]);
          if (optionHour >= hours && !closestTime) {
            closestTime = option.value;
          }
        }
      });

      pickupTimeSelect.value = closestTime;
    }
  }

  // Function to format pickup datetime for display
  function formatPickupDateTime(dateStr, timeStr) {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Format date
    let dateDisplay = '';
    if (date.toDateString() === today.toDateString()) {
      dateDisplay = t('hôm nay');
    } else if (date.toDateString() === tomorrow.toDateString()) {
      dateDisplay = t('ngày mai');
    } else {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      dateDisplay = `${day}/${month}`;
    }

    return `${timeStr} ${dateDisplay}`;
  }

  // Function to validate pickup time (must be in the future)
  function validatePickupTime(dateStr, timeStr) {
    const pickupDateTime = new Date(`${dateStr}T${timeStr}`);
    const now = new Date();

    return pickupDateTime >= now;
  }

  // Initialize pickup datetime on page load
  initializePickupDateTime();

  // Add event listeners for pickup time selection to provide visual feedback
  const pickupDateInput = document.getElementById("pickup-date");
  const pickupTimeSelect = document.getElementById("pickup-time");

  if (pickupDateInput) {
    pickupDateInput.addEventListener("change", function () {
      // Add a subtle animation to show the selection was registered
      this.style.transform = "scale(1.02)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);
    });
  }

  if (pickupTimeSelect) {
    pickupTimeSelect.addEventListener("change", function () {
      // Add a subtle animation to show the selection was registered
      this.style.transform = "scale(1.02)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);
    });
  }

  const btnPreorderTrigger = document.getElementById("btn-preorder-trigger");
  if (btnPreorderTrigger) {
    btnPreorderTrigger.addEventListener("click", function (e) {
      // Validate pickup time before proceeding
      const pickupDate = document.getElementById("pickup-date").value;
      const pickupTime = document.getElementById("pickup-time").value;

      if (!pickupDate || !pickupTime) {
        e.preventDefault();
        e.stopPropagation();

        // Highlight the empty fields
        const pickupDateInput = document.getElementById("pickup-date");
        const pickupTimeInput = document.getElementById("pickup-time");
        const pickupSection = document.querySelector(".pickup-time-section");

        if (!pickupDate && pickupDateInput) {
          pickupDateInput.style.borderColor = "#dc3545";
          pickupDateInput.style.boxShadow = "0 0 0 0.2rem rgba(220, 53, 69, 0.25)";
          setTimeout(() => {
            pickupDateInput.style.borderColor = "";
            pickupDateInput.style.boxShadow = "";
          }, 2000);
        }

        if (!pickupTime && pickupTimeInput) {
          pickupTimeInput.style.borderColor = "#dc3545";
          pickupTimeInput.style.boxShadow = "0 0 0 0.2rem rgba(220, 53, 69, 0.25)";
          setTimeout(() => {
            pickupTimeInput.style.borderColor = "";
            pickupTimeInput.style.boxShadow = "";
          }, 2000);
        }

        // Scroll to pickup section
        if (pickupSection) {
          pickupSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          pickupSection.style.animation = "shake 0.5s";
          setTimeout(() => {
            pickupSection.style.animation = "";
          }, 500);
        }

        alert(t("⏰ Vui lòng chọn ngày và giờ nhận hàng!"));
        return false;
      }

      if (!validatePickupTime(pickupDate, pickupTime)) {
        e.preventDefault();
        e.stopPropagation();

        const pickupSection = document.querySelector(".pickup-time-section");
        if (pickupSection) {
          pickupSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        alert(t("⚠️ Thời gian nhận hàng phải ở tương lai.") + "\n\n" + t("Vui lòng chọn thời gian khác!"));
        return false;
      }

      const originalText = this.innerHTML;
      this.innerHTML = '<i class="ph ph-hourglass-simple"></i> ' + t('Đang tạo đơn...');
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
        const sellerEl = document.getElementById("modal-order-seller");
        if (sellerEl) sellerEl.innerText = currentSeller;

        // Use selected pickup time instead of auto-calculated time
        const formattedPickupTime = formatPickupDateTime(pickupDate, pickupTime);
        document.getElementById("modal-order-time").innerText = formattedPickupTime;

        // Show the modal programmatically since data attributes were removed to enforce validation
        if (typeof bootstrap !== "undefined" && bootstrap.Modal) {
          const modalEl = document.getElementById("orderModal");
          let modalInstance = bootstrap.Modal.getInstance(modalEl);
          if (!modalInstance) {
            modalInstance = new bootstrap.Modal(modalEl);
          }
          modalInstance.show();
        }
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
            qtyPerPerson: 0.1,
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
        name: "Cháo sườn sụn",
        suggestion:
          "Cháo gạo thơm dẻo ninh nhừ với sườn sụn heo giòn sần sật, ăn kèm quẩy giòn và hành lá.",
        seller: "Quầy Gạo & Đồ Khô Cô Xuân",
        reason:
          "Dễ tiêu hóa, phù hợp cho cả gia đình, sườn sụn giòn ngon ngọt tự nhiên từ xương heo.",
        items: [
          {
            name: "Sườn sụn heo",
            qtyPerPerson: 0.15,
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
            name: "Đùi gà",
            qtyPerPerson: 0.3,
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
  // ===== Dynamic Localization Dictionary for Simulator Output =====
  const DICTIONARY = {
    "Bữa sáng": "Breakfast",
    "Bữa trưa": "Lunch",
    "Bữa tối": "Dinner",
    "Bữa sinh viên/tiết kiệm": "Student/Budget Meal",
    "Bữa healthy": "Healthy Meal",
    "Gian hàng Thực Phẩm Cô Lan": "Co Lan's Fresh Foods Stall",
    "Sạp Thực Phẩm Tươi Sống Cô Vy": "Co Vy's Fresh Meat Stall",
    "Quầy Gạo & Đồ Khô Cô Xuân": "Co Xuan's Rice & Dry Goods",
    "Sạp Cá Đồng Chú Sáu": "Chu Sau's Fresh Fish Stall",
    "Vựa Cá Sông Mekong - Anh Ba": "Anh Ba's Mekong River Fish",
    "Sạp Gà Ta Cô Tám": "Co Tam's Chicken Stall",
    "Cửa Hàng Rau Sạch Cô Năm": "Co Nam's Clean Veggies",
    "Nông Sản Sạch Đà Lạt Gia Nghĩa": "Gia Nghia Dalat Veggies",
    "Thủy Hải Sản Cao Cấp Tươi Sạch": "Premium Fresh Seafood",
    "Cửa Hàng Thực Phẩm Nhập Khẩu GreenFoods": "GreenFoods Imports",
    "Sườn non heo": "Pork ribs",
    "Mọc (giò sống)": "Pork paste (giò sống)",
    "Bún tươi": "Fresh rice noodles",
    "Rau thơm & hành lá": "Herbs & green onions",
    "Sườn sụn heo": "Pork soft bone",
    "Quẩy giòn": "Crispy fried dough",
    "Hành lá & gia vị": "Green onions & spices",
    "Cá rô đồng phi lê": "Fillet climbing perch",
    "Bún tươi sạch": "Clean rice noodles",
    "Rau cải & thì là": "Mustard greens & dill",
    "Sườn cốt lết heo": "Pork chops",
    "Cà chua chín": "Ripe tomatoes",
    "Dưa leo sạch": "Clean cucumbers",
    "Hành tỏi gia vị": "Onion, garlic & spices",
    "Cá hú tươi cắt lát": "Sliced basa fish",
    "Thịt ba chỉ heo": "Pork belly",
    "Rau cải ngọt": "Choy sum",
    "Thịt ba chỉ ngon": "Premium pork belly",
    "Rau muống non": "Baby water spinach",
    "Cà pháo muối": "Salted eggplants",
    "Thịt heo xay": "Ground pork",
    "Đậu hũ trắng": "White tofu",
    "Gạo thơm dẻo": "Fragrant rice",
    "Gia vị hành tỏi": "Garlic & onion seasoning",
    "Cá diêu hồng tươi": "Fresh red tilapia",
    "Đồ nấu canh chua": "Sour soup ingredients",
    "Rau sống ăn kèm": "Fresh side herbs",
    "Thịt gà kho sả ớt": "Lemongrass chicken",
    "Đùi gà": "Chicken thighs",
    "Bí đỏ tươi": "Fresh pumpkin",
    "Thịt heo xay (canh)": "Ground pork (soup)",
    "Sả & ớt bằm": "Minced lemongrass & chili",
    "Trứng gà ta": "Local chicken eggs",
    "Thịt nạc vai heo": "Pork shoulder",
    "Hành tây & hành lá": "Onions & green onions",
    "Salad ức gà áp chảo sốt mè": "Pan-seared chicken salad",
    "Ức gà phi lê sạch": "Clean chicken breast",
    "Xà lách Romaine": "Romaine lettuce",
    "Cà chua bi ngọt": "Sweet cherry tomatoes",
    "Sốt mè rang Kewpie": "Kewpie sesame dressing",
    "Bún lứt tôm sú xào bông cải": "Brown noodles with prawns & broccoli",
    "Tôm sú tươi ngon": "Fresh tiger prawns",
    "Bún gạo lứt khô": "Dry brown rice noodles",
    "Bông cải & ớt chuông": "Broccoli & bell peppers",
    "Dầu ô liu xào": "Olive oil for stir-fry",
    "Cá hồi áp chảo sốt cam": "Pan-seared salmon with orange sauce",
    "Phi lê cá hồi tươi": "Fresh salmon fillet",
    "Cam sành vắt nước": "Fresh oranges",
    "Măng tây sạch": "Clean asparagus",
    "Còn dư (Tiết kiệm):": "Savings / Remaining:",
    "Vượt hạn mức:": "Over budget limit:",
    "Tổng cộng": "Total",
    "Đặt trước thực đơn này": "Pre-order this menu",
    "Đặt trước thành công!": "Pre-ordered successfully!",
    "Mã đơn:": "Order ID:",
    "Thực đơn:": "Menu:",
    "Tổng tiền:": "Total cost:",
    "Nhận tại:": "Pickup at:",
    "Thời gian nhận:": "Pickup time:",
    "Trạng thái:": "Status:",
    "Chờ người bán xác nhận": "Awaiting merchant approval",
    "Chọn thời gian nhận hàng:": "Choose pickup time:",
    "Ngày nhận:": "Pickup date:",
    "Giờ nhận:": "Pickup time:",
    "Chọn giờ": "Select time",
    "Sáng sớm": "Early morning",
    "Sáng": "Morning",
    "Trưa": "Noon",
    "Chiều": "Afternoon",
    "Tối": "Evening",
    "Vui lòng đặt trước ít nhất 2 giờ so với thời gian nhận hàng": "Please pre-order at least 2 hours before pickup time",
    "Gian hàng": "Stall",
    "Sản phẩm": "Product",
    "Số lượng": "Quantity",
    "Đơn giá": "Unit Price",
    "Thành tiền": "Amount",
    "Không vượt ngân sách": "Within budget",
    "Đủ khẩu phần": "Adequate portion",
    "Vượt hạn mức": "Budget exceeded",
    "Lý do đề xuất:": "AI Recommendation:",
    "Đề xuất thực đơn": "Suggested menus",
    "Gợi ý": "Option",
    "Món gợi ý:": "Recommended dishes:",
    "Tổng tiền:": "Total cost:",
    "Ngân sách:": "Budget:",
    "Sử dụng": "Used",
    "ngân sách": "budget",
    "Thêm món khác:": "Add item:",
    "Chọn nguyên liệu": "Select ingredient",
    "Thêm": "Add",
    "Cảnh báo: Chi phí đã vượt ngân sách đề ra là": "Warning: Cost exceeds the specified budget of",
    "miếng": "pcs",
    "quả": "eggs",
    "bó": "bunch",
    "phần": "portion",
    "bát": "bowl",
    "túi": "bag",
    "kg": "kg",

    // Alerts and static interactive strings
    "⏰ Vui lòng chọn ngày và giờ nhận hàng!": "⏰ Please select pickup date and time!",
    "⚠️ Thời gian nhận hàng phải ít nhất 2 giờ kể từ bây giờ.": "⚠️ Pickup time must be at least 2 hours from now.",
    "Vui lòng chọn thời gian khác!": "Please choose another time!",
    "Đang tạo đơn...": "Creating order...",
    "Vui lòng nhập nhu cầu của bạn!": "Please enter your request!",
    "hôm nay": "today",
    "ngày mai": "tomorrow",

    // Simulated order customer names
    "Nguyễn Thị Hòa": "Nguyen Thi Hoa",
    "Vũ Thị Linh": "Vu Thi Linh",
    "Hoàng Anh Tuấn": "Hoang Anh Tuan",
    "Lê Văn Bình": "Le Van Binh",
    "Phạm Minh Cường": "Pham Minh Cuong",
    "Trần Thanh Ngọc": "Tran Thanh Ngoc",
    "Đặng Hồng Phương": "Dang Hong Phuong",
    "Bùi Quang Dũng": "Bui Quang Dung",
    "Ngô Quốc Tùng": "Ngo Quoc Tung",
    "Lý Mỹ Duyên": "Ly My Duyen",
    "Đỗ Anh Đức": "Do Anh Duc",
    "Nguyễn Mai Chi": "Nguyen Mai Chi",
    "Phan Văn Nam": "Phan Van Nam",
    "Trịnh Kim Oanh": "Trinh Kim Oanh",
    "Vũ Hoàng Long": "Vu Hoang Long",
    "Lâm Thúy Hằng": "Lam Thuy Hang",
    "Trần Đình Khôi": "Tran Dinh Khoi",
    "Nguyễn Bích Thủy": "Nguyen Bich Thuy",
    "Phạm Hải Đăng": "Pham Hai Dang",
    "Đoàn Minh Tú": "Doan Minh Tu",

    // Simulated order items
    "0.5kg đùi gà tỏi tươi": "0.5kg fresh chicken drumsticks",
    "Ba chỉ lợn nướng kèm 1 bó xà lách": "Pork belly for grilling with 1 bunch of lettuce",
    "Combo ba chỉ lợn nướng, 1 bó xà lách": "Combo pork belly for grilling, 1 bunch of lettuce",
    "1.2kg sườn heo non sạch": "1.2kg clean baby pork ribs",
    "Ba chỉ heo và sườn sụn nướng": "Pork belly and soft-bone for grilling",
    "Combo ba chỉ heo và sườn sụn nướng": "Combo pork belly and soft-bone for grilling",
    "0.5kg thịt heo xay tươi ngon": "0.5kg fresh ground pork",
    "1kg xương ống heo ngọt nước": "1kg sweet pork marrow bones",
    "0.8kg thịt nạc vai heo sạch": "0.8kg clean pork shoulder",
    "0.5kg ba chỉ heo giòn ngon": "0.5kg delicious pork belly",
    "0.6kg sườn sụn heo giòn sần sật": "0.6kg crunchy pork soft-bone",
    "1kg thịt đùi heo tươi": "1kg fresh pork leg",
    "1.5kg cánh gà tươi loại 1": "1.5kg grade-A fresh chicken wings",
    "0.7kg nạc dăm heo mềm ngon": "0.7kg tender pork collar",
    "2kg xương cổ heo hầm măng": "2kg pork neck bones for bamboo shoot soup",
    "0.5kg thịt bò ba chỉ Mỹ cuộn nhúng lẩu": "0.5kg rolled US beef short plate for hotpot",
    "1.2kg tai heo làm giò thủ ngon": "1.2kg pork ears for head cheese",
    "0.8kg chân giò heo rút xương": "0.8kg boneless pork trotters",
    "0.5kg tim heo tươi rói": "0.5kg fresh pork heart",
    "1kg móng giò chặt sẵn": "1kg pre-chopped pork trotters",
    "0.6kg thịt mông sấn làm ruốc": "0.6kg pork rump meat for meat floss",
    "1kg lòng non và dạ dày heo làm sạch": "1kg clean pork small intestines and stomach",
    "Vừa xong": "Just now",
    "phút trước": "minutes ago"
  };

  const TRANSLATED_MENU_NAMES = {
    "Bún sườn mọc": "Pork rib & meatball noodles",
    "Cháo sườn sụn": "Pork soft-bone congee",
    "Bún cá rô đồng": "Climbing perch fish noodles",
    "Cơm sườn rim chua ngọt": "Sweet & sour pork rib rice",
    "Cơm cá hú kho tộ & canh cải": "Claypot basa fish & soup rice",
    "Cơm thịt ba chỉ luộc & canh rau muống": "Boiled pork belly & water spinach soup rice",
    "Thịt bằm sốt cà & Đậu hũ chiên": "Minced pork tomato sauce & fried tofu",
    "Cá diêu hồng chiên xù & canh chua": "Crispy fried tilapia & sour soup",
    "Thịt gà kho sả ớt & canh bí đỏ": "Lemongrass chicken & pumpkin soup",
    "Đậu hũ sốt cà & Canh trứng": "Tomato tofu & egg soup",
    "Trứng rán hành & Canh rau muống": "Omelette & water spinach soup",
    "Cơm thịt heo xào hành tây": "Stir-fried pork with onions rice",
    "Salad ức gà áp chảo sốt mè": "Pan-seared chicken breast salad",
    "Bún lứt tôm sú xào bông cải": "Brown noodles with shrimp & broccoli",
    "Cá hồi áp chảo sốt cam": "Pan-seared salmon with orange sauce"
  };

  const TRANSLATED_SUGGESTIONS = {
    "Bún tươi dai ngon kết hợp sườn heo non ngọt nước và mọc giò sống viên tròn hấp dẫn.": "Delectable fresh noodles combined with sweet baby pork ribs and savory pork paste meatballs.",
    "Cháo gạo thơm dẻo ninh nhừ với sườn sụn heo giòn sần sật, ăn kèm quẩy giòn và hành lá.": "Fragrant soft rice congee simmered with crunchy pork soft-bone, served with crispy dough sticks and green onions.",
    "Bún cá rô đồng phi lê rán vàng giòn riêu thanh mát ngọt bùi ăn kèm thì là hành ngò.": "Golden crispy fried climbing perch fish fillet noodles with refreshing sweet riêu broth, dill and coriander.",
    "Cơm tấm nóng hổi kết hợp sườn rim chua ngọt đưa cơm xào hành tỏi dưa leo.": "Steaming hot broken rice served with rich sweet and sour pork ribs, garlic-sauteed onions, and fresh cucumbers.",
    "Cá hú kho tộ sền sệt béo ngậy ăn với canh rau cải ngọt nấu thịt bằm thanh mát.": "Rich claypot braised fish served with refreshing choy sum and minced pork soup.",
    "Thịt ba chỉ luộc chín mềm ăn kèm cà pháo muối giòn và canh rau muống luộc vắt chanh.": "Tender boiled pork belly served with crunchy salted eggplants and lime-infused morning glory soup.",
    "Thịt heo xay sốt cà chua đậm đà, đậu hũ chiên giòn và canh rau muống tỏi.": "Savory ground pork in tomato sauce, crispy fried tofu, and garlic morning glory soup.",
    "Cá diêu hồng tươi chiên giòn cuốn rau sống chấm nước mắm tỏi ớt kèm bát canh chua dọc mùng thanh nhiệt.": "Crispy fried red tilapia wrapped in fresh herbs, garlic-chili dip, and sweet-sour soup.",
    "Thịt gà góc đùi ta xào sả ớt cay thơm đậm đà dọn kèm bát canh bí đỏ nấu thịt bằm.": "Spicy stir-fried lemongrass chicken thigh served with nutritious pumpkin and minced pork soup.",
    "Đậu hũ chiên sốt cà chua hành lá thơm ngậy cùng bát canh trứng cà chua thơm lừng.": "Pan-fried tofu in tomato scallion sauce paired with fragrant tomato egg drop soup.",
    "Trứng chiên hành lá thơm lừng ăn kèm canh rau muống luộc mát ruột đưa cơm.": "Scallion omelette served with refreshing morning glory soup and hot rice.",
    "Thịt heo xào hành tây giòn ngọt thơm lừng tiêu sọ dùng nóng cùng cơm tẻ.": "Stir-fried pork with sweet onions and black pepper served hot with steamed rice.",
    "Ức gà áp chảo xé sợi trộn rau xà lách Romaine, dưa leo, cà chua bi kết hợp nước sốt mè rang béo nhẹ.": "Shredded pan-seared chicken breast mixed with Romaine lettuce, cucumbers, cherry tomatoes, and light sesame sauce.",
    "Bún gạo lứt luộc trộn tôm sú bóc vỏ xào bông cải xanh giòn ngọt đầy đủ vitamin.": "Boiled brown rice noodles tossed with sweet tiger prawns and crispy stir-fried broccoli.",
    "Cá hồi phi lê áp chảo chín tới thơm mềm sốt cam vắt nguyên chất dọn kèm măng tây xào tỏi.": "Pan-seared tender salmon fillet with fresh orange reduction and garlic asparagus."
  };

  const TRANSLATED_REASONS = {
    "Món ăn giàu dinh dưỡng, cung cấp đủ năng lượng cho ngày mới, sườn heo và mọc tự làm sạch sẽ.": "Highly nutritious dish providing energy for the day, clean homemade pork ribs and meatballs.",
    "Dễ tiêu hóa, phù hợp cho cả gia đình, sườn sụn giòn ngon ngọt tự nhiên từ xương heo.": "Easy to digest, family-friendly, naturally sweet soft-bone pork broth.",
    "Cá rô đồng tươi ngon giàu đạm lành tính xào thơm nấu canh thì là mát ruột đưa bún.": "Fresh, protein-rich climbing perch fish cooked with refreshing dill soup.",
    "Sườn non heo ngon rim sốt chua ngọt đậm vị truyền thống giàu đạm hấp dẫn trôi cơm.": "Traditional sweet & sour pork chops, protein-rich and highly appealing.",
    "Cá hú béo ngậy kho tộ đậm đà đưa cơm ăn kèm canh cải ngọt nóng hổi bổ sung chất xơ.": "Savory claypot basa fish paired with hot choy sum soup for essential fiber.",
    "Món ăn dân dã mát ruột cho ngày hè, thịt heo ba chỉ beo béo ăn cùng cà pháo chua giòn.": "Rustic cooling dish for summer, tender pork belly with crunchy pickled eggplants.",
    "Bữa ăn ấm cúng đủ chất với vị chua ngọt tự nhiên của cà chua, đạm dồi dào từ thịt heo và đậu hũ.": "Cozy, balanced meal with sweet tomato flavor, rich protein from pork and tofu.",
    "Món cá diêu hồng giàu dinh dưỡng, ăn kèm canh chua bạc hà mát lành cho bữa cơm tối gia đình.": "Nutritious red tilapia paired with refreshing sour soup for a family dinner.",
    "Thịt gà xào đậm đà đưa cơm kết hợp canh bí đỏ bổ dưỡng, giúp cả nhà bồi bổ sức khỏe tối nay.": "Rich stir-fried chicken paired with wholesome pumpkin soup for health.",
    "Chi phí cực thấp nhưng cung cấp đầy đủ dinh dưỡng cơ bản. Phù hợp tuyệt vời cho ví tiền sinh viên.": "Ultra-low cost yet provides basic nutrition. Perfect for a student budget.",
    "Món ăn quốc dân dễ nấu, rẻ mà ngon, cung cấp đủ đạm trứng và chất xơ từ rau muống.": "Classic budget-friendly meal, rich in egg protein and morning glory fiber.",
    "Thịt nạc heo giàu dinh dưỡng xào hành tây giòn ngọt thơm ngon kích thích vị giác với giá sinh viên.": "Nutritious pork stir-fried with onions, appetizing and student-priced.",
    "Thực đơn chuẩn Eat Clean giàu protein ít calo giúp giữ dáng, săn cơ khỏe khoắn.": "Eat Clean menu, high protein, low calories to maintain health and shape.",
    "Bữa ăn lành mạnh giàu xơ, tinh bột tốt từ gạo lứt và protein ngọt tự nhiên từ tôm sú tươi.": "Healthy meal rich in fiber, complex carbs from brown rice, and fresh prawn protein.",
    "Cung cấp chất béo tốt Omega-3 cho tim mạch từ cá hồi tươi sạch và măng tây giàu xơ, kali.": "Provides heart-healthy Omega-3 from fresh salmon and fiber-rich asparagus."
  };

  // Helper to map ingredient names to matching Icons (Phosphor Icons & Flaticon Uicons)
  function getIngredientIcon(name) {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("cá") || lowerName.includes("hồi") || lowerName.includes("hú")) {
      return "ph-fill ph-fish";
    }
    if (lowerName.includes("tôm") || lowerName.includes("sú") || lowerName.includes("hải sản")) {
      return "ph-fill ph-shrimp";
    }
    if (lowerName.includes("gà") || lowerName.includes("đùi") || lowerName.includes("cánh")) {
      return "ph-fill ph-bird";
    }
    if (lowerName.includes("bò")) {
      return "ph-fill ph-cow";
    }
    // Using Flaticon Uicon bold meat icon for pork (thịt heo/lợn/sườn/ba chỉ/nạc...)
    if (lowerName.includes("thịt") || lowerName.includes("sườn") || lowerName.includes("giò") || lowerName.includes("ba chỉ") || lowerName.includes("mọc") || lowerName.includes("heo") || lowerName.includes("lợn") || lowerName.includes("nạc")) {
      return "fi fi-br-meat";
    }
    if (lowerName.includes("rau") || lowerName.includes("cải") || lowerName.includes("xà lách") || lowerName.includes("muống") || lowerName.includes("bí đỏ") || lowerName.includes("cà chua") || lowerName.includes("măng tây") || lowerName.includes("hành") || lowerName.includes("tỏi") || lowerName.includes("sả") || lowerName.includes("ớt") || lowerName.includes("thì là") || lowerName.includes("ngò")) {
      return "ph-fill ph-leaf";
    }
    if (lowerName.includes("trứng")) {
      return "ph-fill ph-egg";
    }
    if (lowerName.includes("bún") || lowerName.includes("cơm") || lowerName.includes("cháo") || lowerName.includes("quẩy")) {
      return "ph-fill ph-bowl";
    }
    if (lowerName.includes("đậu hũ") || lowerName.includes("trắng")) {
      return "ph-fill ph-cube";
    }
    if (lowerName.includes("dầu") || lowerName.includes("sốt") || lowerName.includes("kewpie") || lowerName.includes("nước") || lowerName.includes("cam")) {
      return "ph-fill ph-drop";
    }
    return "ph-fill ph-package";
  }

  // Helper translation function
  function t(text) {
    const lang = localStorage.getItem("lang") || "vi";
    if (lang === "vi") return text;
    return DICTIONARY[text] ||
      TRANSLATED_MENU_NAMES[text] ||
      TRANSLATED_SUGGESTIONS[text] ||
      TRANSLATED_REASONS[text] ||
      text;
  }

  // Function to adjust item quantity in cart or delete if at minimum and clicking minus
  function adjustItemQuantity(idx, direction) {
    const item = currentSimulation.activeItems[idx];
    if (!item) return;

    // Determine step based on unit
    let step = 0.1;
    if (["quả", "miếng", "cuộn", "ổ", "gói", "túi", "cây", "chén", "bó", "phần", "bát"].includes(item.unit.toLowerCase())) {
      step = 1;
    }

    // Check if we should delete
    if (direction === -1 && item.qty <= step) {
      // Delete the item
      currentSimulation.activeItems.splice(idx, 1);
    } else {
      // Perform adjustment
      item.qty += direction * step;
      // Handle rounding float errors
      item.qty = Math.round(item.qty * 100) / 100;
    }

    // Re-render suggestion to update totals and summary
    renderActiveSuggestion();
  }

  // Function to render the active dynamic suggestion
  function renderActiveSuggestion() {
    const { peopleCount, budgetLimit, activeOptionIdx, options, activeItems } =
      currentSimulation;
    if (!options || options.length === 0 || !activeItems) return;
    const option = options[activeOptionIdx];

    const lang = localStorage.getItem("lang") || "vi";

    let totalCost = 0;
    let tableRowsHtml = "";

    // Find all unique products in database for the add dropdown
    const allDbItems = [];
    Object.keys(SIMULATOR_DATABASE).forEach(category => {
      SIMULATOR_DATABASE[category].forEach(opt => {
        opt.items.forEach(item => {
          if (!allDbItems.some(existing => existing.name.toLowerCase() === item.name.toLowerCase())) {
            allDbItems.push({
              name: item.name,
              unit: item.unit,
              pricePerUnit: item.pricePerUnit,
              fixed: item.fixed || false
            });
          }
        });
      });
    });

    activeItems.forEach((item, idx) => {
      const cost = item.qty * item.pricePerUnit;
      totalCost += cost;

      const qtyStr = item.qty.toLocaleString(lang === "en" ? "en-US" : "vi-VN");
      const unitPriceStr = item.pricePerUnit.toLocaleString(lang === "en" ? "en-US" : "vi-VN") + "đ/" + t(item.unit);
      const costStr = cost.toLocaleString(lang === "en" ? "en-US" : "vi-VN") + "đ";
      const iconClass = getIngredientIcon(item.name);

      // Determine if we show a minus or trash icon for the minus button
      let step = 0.1;
      if (["quả", "miếng", "cuộn", "ổ", "gói", "túi", "cây", "chén", "bó", "phần", "bát"].includes(item.unit.toLowerCase())) {
        step = 1;
      }

      const isMinQty = item.qty <= step;
      const minusBtnContent = isMinQty ? '<i class="ph ph-trash text-danger" style="font-size: 0.85rem;"></i>' : '-';

      tableRowsHtml += `
        <tr>
          <td>
            <div class="cart-product-cell">
              <div class="ingredient-icon-wrapper rounded-circle d-flex align-items-center justify-content-center me-2 bg-soft-green flex-shrink-0" style="width: 28px; height: 28px;">
                <i class="${iconClass} text-primary" style="font-size: 0.9rem;"></i>
              </div>
              <span class="fw-semibold text-dark" style="font-size: 0.85rem;">${t(item.name)}</span>
            </div>
          </td>
          <td>
            <!-- Interactive Quantity Controls -->
            <div class="cart-qty-controls">
              <button type="button" class="cart-btn-qty cart-btn-qty-minus" data-idx="${idx}">${minusBtnContent}</button>
              <span class="cart-qty-val" data-idx="${idx}" style="cursor: pointer;" title="${lang === 'en' ? 'Double click to edit quantity' : 'Kích đúp để tự nhập số lượng'}">${qtyStr} ${t(item.unit)}</span>
              <button type="button" class="cart-btn-qty cart-btn-qty-plus" data-idx="${idx}">+</button>
            </div>
          </td>
          <td class="text-muted" style="font-size: 0.8rem;">${unitPriceStr}</td>
          <td class="fw-bold text-dark text-end" style="font-size: 0.85rem;">${costStr}</td>
        </tr>
      `;
    });

    const diff = budgetLimit - totalCost;
    const ratio = ((totalCost / budgetLimit) * 100).toFixed(1);
    const diffClass = diff >= 0 ? "text-success" : "text-danger";

    // Translation tags
    const tDiffLabel = diff >= 0 ? t("Còn dư (Tiết kiệm):") : t("Vượt hạn mức:");
    const diffValStr = Math.abs(diff).toLocaleString(lang === "en" ? "en-US" : "vi-VN") + "đ";

    // Assemble the Table layout
    let tableHtml = `
      <div class="cart-table-container">
        <table class="cart-table">
          <thead>
            <tr>
              <th>${t("Sản phẩm")}</th>
              <th>${t("Số lượng")}</th>
              <th>${t("Đơn giá")}</th>
              <th class="text-end">${t("Thành tiền")}</th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
            <!-- Total Row -->
            <tr class="cart-total-row">
              <td colspan="2" class="fw-bold text-dark" style="font-size: 0.9rem; padding: 1rem;">${t("Tổng cộng")}</td>
              <td></td>
              <td class="fw-extrabold text-dark text-end" style="font-size: 1.05rem; padding: 1rem; color: var(--primary-dark) !important;">
                ${totalCost.toLocaleString(lang === "en" ? "en-US" : "vi-VN")}đ
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    // Add budget warning card if exceeded
    if (totalCost > budgetLimit) {
      tableHtml = `
        <div class="exceeded-alert">
          <i class="ph-fill ph-warning-circle" style="font-size: 1.25rem;"></i>
          <span>${t("Cảnh báo: Chi phí đã vượt ngân sách đề ra là")} ${budgetLimit.toLocaleString(lang === "en" ? "en-US" : "vi-VN")}đ!</span>
        </div>
      ` + tableHtml;
    }

    // Filter out items already in cart for add dropdown
    const availableToAdd = allDbItems.filter(dbItem => {
      return !activeItems.some(active => active.name.toLowerCase() === dbItem.name.toLowerCase());
    });

    // Sort alphabetically
    availableToAdd.sort((a, b) => a.name.localeCompare(b.name, "vi"));

    let selectOptionsHtml = `<option value="">-- ${t("Chọn nguyên liệu")} --</option>`;
    availableToAdd.forEach(item => {
      const priceStr = item.pricePerUnit.toLocaleString(lang === "en" ? "en-US" : "vi-VN") + "đ/" + t(item.unit);
      selectOptionsHtml += `<option value="${item.name}">${t(item.name)} (${priceStr})</option>`;
    });

    const addBoxHtml = `
      <div class="add-item-box d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2 mt-3">
        <div class="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center flex-grow-1 gap-2">
          <label class="text-muted small fw-bold flex-shrink-0" style="font-size: 0.75rem;"><i class="ph ph-plus"></i> ${t("Thêm món khác:")}</label>
          <select class="form-select form-select-sm add-item-select" id="add-item-select" style="min-width: 120px; flex: 1 1 auto;">
            ${selectOptionsHtml}
          </select>
        </div>
        <button type="button" class="btn btn-success btn-sm btn-add-item align-self-center align-self-sm-auto flex-shrink-0" id="btn-add-item">
          <i class="ph ph-plus-circle"></i> ${t("Thêm")}
        </button>
      </div>
    `;

    tableHtml += addBoxHtml;

    // Update basic suggestions UI
    const mealLabel = lang === "en" ? `${t(currentSimulation.mealType)} for ${peopleCount} people` : `${currentSimulation.mealType} ${peopleCount} người`;
    document.getElementById("result-title").innerHTML =
      `<i class="ph-fill ph-check-circle text-success"></i> ${mealLabel}: ${t(option.name)}`;
    document.getElementById("result-suggestion").innerText = t(option.suggestion);
    document.getElementById("result-total-price").innerText =
      totalCost.toLocaleString(lang === "en" ? "en-US" : "vi-VN") + "đ";
    document.getElementById("result-budget-limit").innerText =
      budgetLimit.toLocaleString(lang === "en" ? "en-US" : "vi-VN") + "đ";

    const receiptContainer = document.getElementById("receipt-invoice-container");
    if (receiptContainer) {
      receiptContainer.innerHTML = tableHtml;

      // Attach click events to dynamic quantity buttons in the table
      const minusBtns = receiptContainer.querySelectorAll(".cart-btn-qty-minus");
      const plusBtns = receiptContainer.querySelectorAll(".cart-btn-qty-plus");

      minusBtns.forEach(btn => {
        btn.addEventListener("click", function () {
          const idx = parseInt(this.getAttribute("data-idx"));
          adjustItemQuantity(idx, -1);
        });
      });

      plusBtns.forEach(btn => {
        btn.addEventListener("click", function () {
          const idx = parseInt(this.getAttribute("data-idx"));
          adjustItemQuantity(idx, 1);
        });
      });

      // Attach double-click event to directly edit quantities
      const qtyVals = receiptContainer.querySelectorAll(".cart-qty-val");
      qtyVals.forEach(val => {
        val.addEventListener("dblclick", function () {
          const idx = parseInt(this.getAttribute("data-idx"));
          const item = currentSimulation.activeItems[idx];
          if (!item) return;

          // Create inline input element
          const input = document.createElement("input");
          input.type = "number";
          input.value = item.qty;

          // Set step based on unit (integers for units like pcs, decimals for kg)
          const isIntegerUnit = ["quả", "miếng", "cuộn", "ổ", "gói", "túi", "cây", "chén", "bó", "phần", "bát"].includes(item.unit.toLowerCase());
          input.step = isIntegerUnit ? "1" : "0.01";
          input.min = isIntegerUnit ? "1" : "0.05";

          input.style.width = "65px";
          input.style.fontSize = "0.8rem";
          input.style.padding = "2px";
          input.style.textAlign = "center";
          input.style.borderRadius = "4px";
          input.style.border = "1px solid var(--primary)";
          input.style.backgroundColor = "var(--white)";
          input.style.color = "var(--text-dark)";

          let isSaved = false;
          const saveValue = () => {
            if (isSaved) return;
            isSaved = true;

            const newQty = parseFloat(input.value);
            if (!isNaN(newQty) && newQty > 0) {
              item.qty = Math.round(newQty * 100) / 100;
              renderActiveSuggestion();
              // Re-render overview tabs as they display total prices
              renderOptionTabs();
            } else {
              renderActiveSuggestion();
            }
          };

          input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
              saveValue();
            } else if (e.key === "Escape") {
              renderActiveSuggestion();
            }
          });

          input.addEventListener("blur", saveValue);

          // Replace text content with input and focus it
          this.innerHTML = "";
          this.appendChild(input);
          input.focus();
          input.select();
        });
      });

      // Attach add item event handler
      const btnAddItem = receiptContainer.querySelector("#btn-add-item");
      if (btnAddItem) {
        btnAddItem.addEventListener("click", function () {
          const selectEl = receiptContainer.querySelector("#add-item-select");
          if (!selectEl) return;
          const selectedName = selectEl.value;
          if (!selectedName) {
            alert(lang === "en" ? "Please select an ingredient to add!" : "Vui lòng chọn nguyên liệu muốn thêm!");
            return;
          }

          // Find item in allDbItems
          const found = allDbItems.find(item => item.name === selectedName);
          if (found) {
            // Add to activeItems with default quantity
            let defaultQty = 1;
            if (found.unit.toLowerCase() === "kg") {
              defaultQty = 0.5; // default 0.5kg for weight items
            }

            currentSimulation.activeItems.push({
              name: found.name,
              qty: defaultQty,
              unit: found.unit,
              pricePerUnit: found.pricePerUnit,
              fixed: found.fixed
            });

            // Re-render
            renderActiveSuggestion();
          }
        });
      }
    }

    document.getElementById("result-seller-name").innerText = t(option.seller);

    // Dynamic recommendation reason
    let customReason = t(option.reason);
    if (diff >= 0) {
      if (lang === "en") {
        customReason += ` This menu uses ${totalCost.toLocaleString("en-US")}đ (occupying ${ratio}% of budget), saving you ${diff.toLocaleString("en-US")}đ compared to your limit.`;
      } else {
        customReason += ` Thực đơn này sử dụng ${totalCost.toLocaleString("vi-VN")}đ (chiếm ${ratio}% ngân sách), giúp bạn tiết kiệm được ${diff.toLocaleString("vi-VN")}đ so với hạn mức đề ra.`;
      }
    } else {
      if (lang === "en") {
        customReason += ` Warning: Actual cost is ${totalCost.toLocaleString("en-US")}đ (occupying ${ratio}% of budget), which exceeds your budget limit of ${budgetLimit.toLocaleString("en-US")}đ.`;
      } else {
        customReason += ` Cảnh báo: Chi phí nguyên liệu thực tế là ${totalCost.toLocaleString("vi-VN")}đ (chiếm ${ratio}% ngân sách), đã vượt quá hạn mức ngân sách của bạn là ${budgetLimit.toLocaleString("vi-VN")}đ.`;
      }
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
      if (lang === "en") {
        progressPercent.innerText = `Using ${ratio}% of budget`;
      } else {
        progressPercent.innerText = `Sử dụng ${ratio}% ngân sách`;
      }
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
                    <div class="verify-badge exceeded"><i class="ph-fill ph-warning-circle"></i> ${t("Vượt hạn mức")}</div>
                    <div class="verify-badge"><i class="ph-fill ph-users"></i> ${t("Đủ khẩu phần")}</div>
                `;
      } else {
        verificationBadgesContainer.innerHTML = `
                    <div class="verify-badge"><i class="ph ph-shield-check"></i> ${t("Không vượt ngân sách")}</div>
                    <div class="verify-badge"><i class="ph-fill ph-users"></i> ${t("Đủ khẩu phần")}</div>
                `;
      }
    }
  }

  // Function to render suggestion tabs
  function renderOptionTabs() {
    const container = document.getElementById("option-tabs-container");
    if (!container) return;

    const lang = localStorage.getItem("lang") || "vi";

    let tabsHtml = "";
    currentSimulation.options.forEach((opt, idx) => {
      // Calculate total cost for this option to display in the card preview
      let optionCost = 0;
      if (idx === currentSimulation.activeOptionIdx && currentSimulation.activeItems) {
        currentSimulation.activeItems.forEach(item => {
          optionCost += item.qty * item.pricePerUnit;
        });
      } else {
        opt.items.forEach(item => {
          const qty = calculateQuantity(item, currentSimulation.peopleCount);
          optionCost += qty * item.pricePerUnit;
        });
      }

      const isActive = idx === currentSimulation.activeOptionIdx;
      const activeClass = isActive ? "active-suggestion-card" : "";
      const labelText = lang === "en" ? `Option ${idx + 1}` : `Gợi ý ${idx + 1}`;

      tabsHtml += `
        <div class="suggestion-overview-card p-3 flex-fill ${activeClass}" data-option-idx="${idx}" style="cursor: pointer;">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge badge-overview-num">${labelText}</span>
            <span class="overview-price fw-extrabold text-success" style="font-size: 0.95rem; font-weight: 800;">${optionCost.toLocaleString(lang === "en" ? "en-US" : "vi-VN")}đ</span>
          </div>
          <h6 class="overview-title mb-2 fw-bold text-dark" style="font-size: 0.9rem; margin-top: 0.25rem;">${t(opt.name)}</h6>
          <p class="overview-desc mb-0 text-muted small" style="font-size: 0.75rem; line-height: 1.35;">${t(opt.suggestion)}</p>
        </div>
      `;
    });
    container.innerHTML = tabsHtml;

    // Add event listeners to tabs
    const tabs = container.querySelectorAll(".suggestion-overview-card");
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        tabs.forEach((t) => t.classList.remove("active-suggestion-card"));
        this.classList.add("active-suggestion-card");

        const idx = parseInt(this.getAttribute("data-option-idx"));
        currentSimulation.activeOptionIdx = idx;

        // Initialize activeItems for the newly selected tab suggestion
        const selectedOption = currentSimulation.options[idx];
        currentSimulation.activeItems = selectedOption.items.map(item => {
          return {
            name: item.name,
            qty: calculateQuantity(item, currentSimulation.peopleCount),
            unit: item.unit,
            pricePerUnit: item.pricePerUnit,
            fixed: item.fixed || false
          };
        });

        renderActiveSuggestion();
        // Re-render tabs to update costs and active states
        renderOptionTabs();
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

    // Map initial active items from the selected suggestion
    currentSimulation.activeItems = filteredOptions[0].items.map(item => {
      return {
        name: item.name,
        qty: calculateQuantity(item, peopleCount),
        unit: item.unit,
        pricePerUnit: item.pricePerUnit,
        fixed: item.fixed || false
      };
    });

    // Synchronize preset button highlights
    const presetBtns = document.querySelectorAll(".preset-btn");
    presetBtns.forEach((btn) => {
      btn.classList.remove("active");
      const presetKey = btn.getAttribute("data-preset");
      const isMatch = (presetKey === "55k" && mealType === "Bữa sáng" && budgetLimit === 55000) ||
        (presetKey === "90k" && mealType === "Bữa trưa" && budgetLimit === 90000) ||
        (presetKey === "130k" && mealType === "Bữa tối" && budgetLimit === 130000) ||
        (presetKey === "45k" && mealType === "Bữa sinh viên/tiết kiệm" && budgetLimit === 45000) ||
        (presetKey === "120k" && mealType === "Bữa healthy" && budgetLimit === 120000);
      if (isMatch) {
        btn.classList.add("active");
      }
    });

    // Disable all inputs during the 1.8s simulation to prevent double submits
    const btnCustomSubmit = document.getElementById("btn-custom-submit");
    const customInputText = document.getElementById("custom-input-text");
    const lang = localStorage.getItem("lang") || "vi";

    presetBtns.forEach(btn => btn.disabled = true);
    if (btnCustomSubmit) {
      btnCustomSubmit.disabled = true;
      btnCustomSubmit.innerHTML = '<i class="ph ph-circle-notch spinner-btn me-1"></i><span class="lang-vi">Đang tìm...</span><span class="lang-en">Searching...</span>';
    }
    if (customInputText) {
      customInputText.disabled = true;
    }

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
        icon.innerHTML = '<i class="ph ph-circle"></i>';
        icon.className = "sim-step-icon text-muted me-2";
      }
    });

    // Set parsing badge initial state
    const parsedBadge = document.getElementById("ai-parsed-badge");
    if (parsedBadge) parsedBadge.innerText = lang === "en" ? "Wait..." : "Chờ...";

    // Step 1: Active (Start at 100ms)
    setTimeout(() => {
      if (steps[0]) steps[0].classList.add("active");
      if (icons[0]) {
        icons[0].innerHTML = '<i class="ph ph-arrows-counter-clockwise spinner-btn"></i>';
        icons[0].className = "sim-step-icon me-2 text-primary";
      }

      // Step 1 Done, Step 2 Active (Trigger at 600ms)
      setTimeout(() => {
        if (steps[0]) {
          steps[0].classList.remove("active");
          steps[0].classList.add("done");
        }
        if (icons[0]) {
          icons[0].innerHTML =
            '<i class="ph-fill ph-check-circle text-success"></i>';
          icons[0].className = "sim-step-icon me-2 text-success";
        }
        if (parsedBadge) {
          const budgetFormatted = budgetLimit / 1000 + "k";
          parsedBadge.innerText = budgetFormatted + ", " + peopleCount + " " + (lang === "en" ? "people" : "người") + ", " + t(mealType);
        }

        if (steps[1]) steps[1].classList.add("active");
        if (icons[1]) {
          icons[1].innerHTML = '<i class="ph ph-arrows-counter-clockwise spinner-btn"></i>';
          icons[1].className = "sim-step-icon me-2 text-primary";
        }

        // Step 2 Done, Step 3 Active (Trigger at 1100ms)
        setTimeout(() => {
          if (steps[1]) {
            steps[1].classList.remove("active");
            steps[1].classList.add("done");
          }
          if (icons[1]) {
            icons[1].innerHTML =
              '<i class="ph-fill ph-check-circle text-success"></i>';
            icons[1].className = "sim-step-icon me-2 text-success";
          }

          if (steps[2]) steps[2].classList.add("active");
          if (icons[2]) {
            icons[2].innerHTML = '<i class="ph ph-arrows-counter-clockwise spinner-btn"></i>';
            icons[2].className = "sim-step-icon me-2 text-primary";
          }

          // Step 3 Done, Render results and hide overlay (Trigger at 1600ms)
          setTimeout(() => {
            if (steps[2]) {
              steps[2].classList.remove("active");
              steps[2].classList.add("done");
            }
            if (icons[2]) {
              icons[2].innerHTML =
                '<i class="ph-fill ph-check-circle text-success"></i>';
              icons[2].className = "sim-step-icon me-2 text-success";
            }

            // Render suggestion details
            renderOptionTabs();
            renderActiveSuggestion();

            // Hide overlay
            if (overlay) overlay.classList.add("d-none");

            // Step 4: Re-enable buttons and inputs (Trigger at 1800ms)
            setTimeout(() => {
              presetBtns.forEach(btn => btn.disabled = false);
              if (btnCustomSubmit) {
                btnCustomSubmit.disabled = false;
                btnCustomSubmit.innerHTML = '<i class="ph ph-magnifying-glass"></i> <span class="lang-vi">Tìm thực đơn</span><span class="lang-en">Find Menu</span>';
              }
              if (customInputText) {
                customInputText.disabled = false;
              }
            }, 200);

          }, 500);
        }, 500);
      }, 500);
    }, 100);
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

  // ===== Custom Input Handler =====
  function parseCustomInput(inputText) {
    // Parse user input to extract budget, people count, and meal type
    const text = inputText.toLowerCase().trim();

    // Extract budget (look for numbers followed by k, đ, or standalone numbers)
    let budget = 100000; // default
    const budgetMatch = text.match(/(\d+)(k|đ)?/);
    if (budgetMatch) {
      let num = parseInt(budgetMatch[1]);
      if (budgetMatch[2] === 'k' || num < 1000) {
        // If 'k' is present or number is small, treat as thousands
        budget = num * 1000;
      } else {
        budget = num;
      }
    }

    // Extract number of people
    let people = 2; // default
    const peopleMatch = text.match(/(\d+)\s*(người|người ăn|ng)/);
    if (peopleMatch) {
      people = parseInt(peopleMatch[1]);
    }

    // Determine meal type
    let mealType = "Bữa tối"; // default
    if (text.includes("sáng")) {
      mealType = "Bữa sáng";
    } else if (text.includes("trưa")) {
      mealType = "Bữa trưa";
    } else if (text.includes("tối") || text.includes("chiều")) {
      mealType = "Bữa tối";
    } else if (text.includes("tiết kiệm") || text.includes("sinh viên")) {
      mealType = "Bữa sinh viên/tiết kiệm";
    } else if (text.includes("healthy") || text.includes("khỏe") || text.includes("lành mạnh")) {
      mealType = "Bữa healthy";
    }

    return { budget, people, mealType };
  }

  // Custom input submit button handler
  const btnCustomSubmit = document.getElementById("btn-custom-submit");
  const customInputText = document.getElementById("custom-input-text");

  if (btnCustomSubmit && customInputText) {
    btnCustomSubmit.addEventListener("click", function () {
      const inputValue = customInputText.value.trim();

      if (!inputValue) {
        alert(t("Vui lòng nhập nhu cầu của bạn!"));
        return;
      }

      // Parse the input
      const { budget, people, mealType } = parseCustomInput(inputValue);

      // Remove active class from preset buttons
      presetBtns.forEach((b) => b.classList.remove("active"));

      // Trigger simulation
      startMenuSimulation(mealType, people, budget);

      // Show feedback to user
      customInputText.value = "";
      if (getLang() === "en") {
        customInputText.placeholder = `Searched: ${budget.toLocaleString('en-US')}đ for ${people} people - ${t(mealType)}`;
      } else {
        customInputText.placeholder = `Đã tìm: ${budget.toLocaleString('vi-VN')}đ cho ${people} người - ${mealType}`;
      }
    });

    // Allow Enter key to submit
    customInputText.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        btnCustomSubmit.click();
      }
    });
  }

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
      items: "Ba chỉ lợn nướng kèm 1 bó xà lách",
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
      items: "Ba chỉ heo và sườn sụn nướng",
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

    {
      customer: "Đỗ Anh Đức",
      shop: "Thịt Sạch Cô Vy",
      items: "1.5kg cánh gà tươi loại 1",
      price: 135000,
    },
    {
      customer: "Nguyễn Mai Chi",
      shop: "Thịt Sạch Cô Vy",
      items: "0.7kg nạc dăm heo mềm ngon",
      price: 98000,
    },
    {
      customer: "Phan Văn Nam",
      shop: "Thịt Sạch Cô Vy",
      items: "2kg xương cổ heo hầm măng",
      price: 110000,
    },
    {
      customer: "Trịnh Kim Oanh",
      shop: "Thịt Sạch Cô Vy",
      items: "0.5kg thịt bò ba chỉ Mỹ cuộn nhúng lẩu",
      price: 145000,
    },
    {
      customer: "Vũ Hoàng Long",
      shop: "Thịt Sạch Cô Vy",
      items: "1.2kg tai heo làm giò thủ ngon",
      price: 156000,
    },
    {
      customer: "Lâm Thúy Hằng",
      shop: "Thịt Sạch Cô Vy",
      items: "0.8kg chân giò heo rút xương",
      price: 115000,
    },
    {
      customer: "Trần Đình Khôi",
      shop: "Thịt Sạch Cô Vy",
      items: "0.5kg tim heo tươi rói",
      price: 85000,
    },
    {
      customer: "Nguyễn Bích Thủy",
      shop: "Thịt Sạch Cô Vy",
      items: "1kg móng giò chặt sẵn",
      price: 90000,
    },
    {
      customer: "Phạm Hải Đăng",
      shop: "Thịt Sạch Cô Vy",
      items: "0.6kg thịt mông sấn làm ruốc",
      price: 72000,
    },
    {
      customer: "Đoàn Minh Tú",
      shop: "Thịt Sạch Cô Vy",
      items: "1kg lòng non và dạ dày heo làm sạch",
      price: 140000,
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
      revenueEl.textContent = currentRevenue.toLocaleString(getLang() === "en" ? "en-US" : "vi-VN") + "đ";
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
    const orderLocale = getLang() === "en" ? "en-US" : "vi-VN";
    orderEl.innerHTML = `
      <div class="order-details-left min-w-0">
        <div class="fw-bold text-truncate text-dark" style="font-size: 0.9rem;">${template.customer}</div>
        <div class="text-muted text-truncate" style="font-size: 0.8rem;">${template.items}</div>
      </div>
      <div class="order-details-right text-end flex-shrink-0 ps-2">
        <div class="fw-bold text-success" style="font-size: 0.9rem;">${template.price.toLocaleString(orderLocale)}đ</div>
        <div class="text-muted small" style="font-size: 0.75rem;">${t('Vừa xong')}</div>
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
        timeEl.textContent = getLang() === "en" ? `${index * 2} mins ago` : `${index * 2} phút trước`;
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
  setInterval(simulateNewOrder, 3000);
  // ===== STATIC TRANSLATIONS FOR LANDING PAGE (Bilingual VI/EN Support) =====
  const STATIC_TRANSLATIONS = {
    // Navbar Logo
    "nav.navbar .navbar-brand": {
      vi: `<img src="assets/team/logo.png" alt="Chợ AI Local" width="28" height="28" class="me-2 align-middle navbar-brand-logo" />Chợ AI Local`,
      en: `<img src="assets/team/logo.png" alt="Chợ AI Local" width="28" height="28" class="me-2 align-middle navbar-brand-logo" />AI Local Market`
    },


    // Obsolete selectors migrated to HTML-based lang-vi/lang-en spans


    // Business Section
    "#business h2": {
      vi: "Mô hình kinh doanh thực tế",
      en: "Realistic Business Model"
    },
    "#business p.business-subtitle": {
      vi: "Mô hình chia sẻ doanh thu và dịch vụ số bền vững",
      en: "Sustainable revenue-sharing and digital service models"
    },
    "#business .col-lg-6:nth-child(1) .business-role-card h4": {
      vi: "Miễn phí cho Người mua",
      en: "Free for Buyers"
    },
    "#business .col-lg-6:nth-child(1) .business-role-card p": {
      vi: "Luôn luôn tìm kiếm thực đơn và đặt trước miễn phí.",
      en: "Always search menus and pre-order for free."
    },
    "#business .col-lg-6:nth-child(2) .business-role-card h4": {
      vi: "Dịch vụ Số cho Tiểu thương",
      en: "Digital Services for Merchants"
    },
    "#business .col-lg-6:nth-child(2) .business-role-card p": {
      vi: "Bắt đầu miễn phí, thu phí dịch vụ nhỏ khi quy mô tăng.",
      en: "Start for free, small service fee as scale grows."
    },
    "#business h3": {
      vi: "Các gói dành cho người bán",
      en: "Merchant Service Plans"
    },
    "#business h3 + p": {
      vi: "Giai đoạn đầu ưu tiên để tiểu thương dùng thử dễ dàng, sau đó thu phí khi giá trị đã rõ ràng.",
      en: "Trial phase is prioritised for easy merchant adoption, transitioning to paid plans once value is established."
    },



    // Revenue block
    ".revenue-box h4": {
      vi: "Dòng tiền bổ sung",
      en: "Additional Revenue Streams"
    },
    ".revenue-box p.text-muted": {
      vi: "Ngoài gói tháng, nền tảng có thể tạo doanh thu từ giao dịch và dịch vụ mở rộng.",
      en: "In addition to monthly plans, the platform can generate revenue from transactions and value-added services."
    },
    ".revenue-item:nth-child(1) h6": {
      vi: "Phí giao dịch",
      en: "Transaction Fee"
    },
    ".revenue-item:nth-child(1) p": {
      vi: "Thu khoản nhỏ trên đơn đặt trước thành công.",
      en: "Charge a small fee on successful pre-orders."
    },
    ".revenue-item:nth-child(2) h6": {
      vi: "Quảng bá sạp hàng",
      en: "Stall Promotion"
    },
    ".revenue-item:nth-child(2) p": {
      vi: "Ưu tiên hiển thị sản phẩm hoặc gian hàng nổi bật.",
      en: "Priority listings for featured items or stalls."
    },
    ".revenue-item:nth-child(3) h6": {
      vi: "Đối tác mở rộng",
      en: "Expansion Partners"
    },
    ".revenue-item:nth-child(3) p": {
      vi: "Hợp tác thanh toán và giao hàng.",
      en: "Integrations with payment and delivery partners."
    },
    ".business-highlight span": {
      vi: "Người mua tạo nhu cầu thật. Người bán nhận đơn hàng thật. Nền tảng tạo doanh thu từ giá trị thật.",
      en: "Buyers create real demand. Sellers receive real orders. The platform generates revenue from real value."
    },


    // Team Section
    "#team h2": {
      vi: "Đội ngũ phát triển HUIT EMART",
      en: "HUIT EMART Development Team"
    },
    "#team p.lead": {
      vi: "Sinh viên công nghệ nhiệt huyết đến từ Trường Đại học Công Thương TP.HCM",
      en: "Enthusiastic tech students from Ho Chi Minh City University of Industry and Trade"
    },

    // Final CTA Section
    ".cta-section h2": {
      vi: "Chợ AI Local",
      en: "AI Local Market"
    },
    ".cta-section p.lead": {
      vi: "Chợ AI Local giúp người mua tìm thực đơn tự nấu theo ngân sách từ sản phẩm thật của gian hàng địa phương, đồng thời hỗ trợ tiểu thương quản lý sản phẩm, tồn kho và đơn đặt trước bằng dữ liệu.",
      en: "Chợ AI Local helps buyers search home-cooking menus within budget using real items from local stalls, while supporting merchants to manage products, inventory, and pre-orders with data."
    },
    ".cta-section a[href='#demo'].btn-light": {
      vi: `<i class="ph ph-arrows-counter-clockwise"></i> Xem lại demo`,
      en: `<i class="ph ph-arrows-counter-clockwise"></i> Replay Demo`
    },
    ".cta-section a[href^='mailto'].btn-outline-light": {
      vi: `<i class="ph ph-envelope"></i> Liên hệ đội thi`,
      en: `<i class="ph ph-envelope"></i> Contact Team`
    },

    // Footer
    "footer p": {
      vi: "© 2026 Chợ AI Local — Đi chợ thông minh, ăn ngon đúng ngân sách.",
      en: "© 2026 AI Local Market — Shop smart, eat well, stay within budget."
    },

    // Back to top
    "#backToTop": {
      vi: `<i class="ph ph-arrow-up"></i>`,
      en: `<i class="ph ph-arrow-up"></i>`
    },

    // Order Modal
    "#orderModal h4": {
      vi: "Đặt trước thành công!",
      en: "Pre-order Successful!"
    },
    "#orderModal .detail-row:nth-child(1) .detail-label": {
      vi: "Mã đơn:",
      en: "Order ID:"
    },
    "#orderModal .detail-row:nth-child(2) .detail-label": {
      vi: "Thực đơn:",
      en: "Menu:"
    },
    "#orderModal .detail-row:nth-child(3) .detail-label": {
      vi: "Tổng tiền:",
      en: "Total cost:"
    },
    "#orderModal .detail-row:nth-child(4) .detail-label": {
      vi: "Nhận tại:",
      en: "Pickup at:"
    },
    "#orderModal .detail-row:nth-child(5) .detail-label": {
      vi: "Thời gian nhận:",
      en: "Pickup time:"
    },
    "#orderModal .detail-row:nth-child(6) .detail-label": {
      vi: "Trạng thái:",
      en: "Status:"
    },
    "#orderModal button[data-bs-dismiss='modal'].btn-primary": {
      vi: "Đóng",
      en: "Close"
    }
  };

  // Static translation applier function
  function applyLanguage(lang) {
    document.documentElement.setAttribute("lang", lang);

    // Translate Pickup Time options
    const pickupTimeSelect = document.getElementById("pickup-time");
    if (pickupTimeSelect) {
      const options = pickupTimeSelect.options;
      for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        if (opt.value === "") {
          opt.textContent = lang === "en" ? "Select time" : "Chọn giờ";
        } else {
          const time = opt.value;
          let period = "";
          if (time === "06:00") period = lang === "en" ? "Early morning" : "Sáng sớm";
          else if (["07:00", "08:00", "09:00", "10:00"].includes(time)) period = lang === "en" ? "Morning" : "Sáng";
          else if (["11:00", "12:00"].includes(time)) period = lang === "en" ? "Noon" : "Trưa";
          else if (["13:00", "14:00", "15:00", "16:00", "17:00"].includes(time)) period = lang === "en" ? "Afternoon" : "Chiều";
          else if (["18:00", "19:00", "20:00"].includes(time)) period = lang === "en" ? "Evening" : "Tối";
          opt.textContent = `${time} - ${period}`;
        }
      }
    }

    // Format dynamic revenue metric
    const revenueEl = document.getElementById("todayRevenue");
    if (revenueEl && typeof currentRevenue !== 'undefined') {
      revenueEl.textContent = currentRevenue.toLocaleString(lang === "en" ? "en-US" : "vi-VN") + "đ";
    }

    // Set switcher button state text
    const langBtnText = document.getElementById("lang-toggle-text");
    if (langBtnText) {
      langBtnText.textContent = lang === "en" ? "VI" : "EN";
    }

    // Translate Title
    document.title = lang === "en" ? "AI Local Market - Smart Local Market" : "Chợ AI Local - Chợ địa phương thông minh";

    // Custom input text placeholder translation
    const customInputText = document.getElementById("custom-input-text");
    if (customInputText) {
      customInputText.placeholder = lang === "en"
        ? "Example: 100k for dinner for 3 people"
        : "Ví dụ: 100k cho bữa tối 3 người";
    }

    // Apply translations
    Object.keys(STATIC_TRANSLATIONS).forEach(selector => {
      const els = document.querySelectorAll(selector);
      els.forEach(el => {
        const trans = STATIC_TRANSLATIONS[selector][lang];
        if (trans !== undefined) {
          el.innerHTML = trans;
        }
      });
    });

    // Re-render active simulator suggestions
    if (typeof currentSimulation !== 'undefined' && currentSimulation.options && currentSimulation.options.length > 0) {
      renderOptionTabs();
      renderActiveSuggestion();
    }
  }

  // ===== Theme and Language Event Listeners and Initialization =====

  // Theme Toggle Logic
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  if (themeToggleBtn && themeIcon) {
    themeToggleBtn.addEventListener("click", function () {
      const isDark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      // Update icon
      if (isDark) {
        themeIcon.className = "ph ph-sun";
      } else {
        themeIcon.className = "ph ph-moon";
      }
    });
  }

  // Language Toggle Logic
  const langToggleBtn = document.getElementById("lang-toggle");
  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", function () {
      const currentLang = localStorage.getItem("lang") || "vi";
      const newLang = currentLang === "vi" ? "en" : "vi";
      localStorage.setItem("lang", newLang);
      applyLanguage(newLang);
    });
  }

  // INITIAL RUN: Retrieve saved settings on page load
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeIcon) themeIcon.className = "ph ph-sun";
  } else {
    document.body.classList.remove("dark-mode");
    if (themeIcon) themeIcon.className = "ph ph-moon";
  }

  const savedLang = localStorage.getItem("lang") || "vi";
  applyLanguage(savedLang);


  console.log("Chợ AI Local - Landing Page Loaded Successfully!");
});
