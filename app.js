// Global state
let currentLang = 'ar';
let charts = {};

// Data
const esgData = {
    totalCompanies: 373,
    nonListedTotal: 149,
    nonListedRatings: {
        excellent: 4,
        veryGood: 25,
        good: 30,
        acceptable: 40,
        needsImprovement: 50
    },
    nonListedSectors: [
        { nameAr: 'قطاع سوق المال', nameEn: 'Capital Market', icon: '📈', ratings: [2, 6, 2, 3, 5] },
        { nameAr: 'قطاع التأمين', nameEn: 'Insurance', icon: '🛡️', ratings: [4, 1, 5, 2, 6] },
        { nameAr: 'قطاع التمويل العقاري', nameEn: 'Real Estate Finance', icon: '🏠', ratings: [2, 2, 4, 3, 5] },
        { nameAr: 'قطاع التمويل الاستهلاكي', nameEn: 'Consumer Finance', icon: '💳', ratings: [3, 5, 3, 6, 5] },
        { nameAr: 'قطاع التخصيم', nameEn: 'Factoring', icon: '📋', ratings: [2, 2, 6, 3, 2] },
        { nameAr: 'قطاع التأجير التمويلي', nameEn: 'Leasing', icon: '🚗', ratings: [3, 3, 4, 6, 2] },
        { nameAr: 'قطاع التمويل متناهي الصغر', nameEn: 'Microfinance', icon: '🤝', ratings: [7, 9, 9, 9, 10] }
    ],
    listedTotal: 224,
    listedRatings: {
        excellent: 10,
        veryGood: 24,
        good: 40,
        acceptable: 50,
        needsImprovement: 100
    },
    listedNonBanking: [5, 10, 20, 15, 6],
    listedOtherSectors: [8, 20, 30, 40, 70]
};

const tcfdData = {
    totalCompanies: 169,
    nonListedTotal: 47,
    nonListedRatings: {
        excellent: 0,
        veryGood: 1,
        good: 11,
        acceptable: 16,
        needsImprovement: 20
    },
    capitalMarket: [1, 1, 0, 1, 1],
    insurance: [0, 1, 1, 1, 1],
    financingSectors: [
        { nameAr: 'قطاع التمويل العقاري', nameEn: 'Real Estate Finance', icon: '🏠', ratings: [1, 0, 1, 1, 1] },
        { nameAr: 'قطاع التمويل الاستهلاكي', nameEn: 'Consumer Finance', icon: '💳', ratings: [1, 1, 1, 1, 1] },
        { nameAr: 'قطاع التخصيم', nameEn: 'Factoring', icon: '📋', ratings: [0, 1, 1, 0, 1] },
        { nameAr: 'قطاع التأجير التمويلي', nameEn: 'Leasing', icon: '🚗', ratings: [1, 1, 1, 1, 0] },
        { nameAr: 'قطاع التمويل متناهي الصغر', nameEn: 'Microfinance', icon: '🤝', ratings: [3, 3, 4, 3, 5] }
    ],
    listedTotal: 122,
    listedNonBanking: [2, 5, 5, 10, 20],
    listedOtherSectors: [5, 10, 15, 20, 30]
};

const ratingLabels = {
    ar: ['ممتاز', 'جيد جدًا', 'جيد', 'مقبول', 'يحتاج إلى تحسين'],
    en: ['Excellent', 'Very Good', 'Good', 'Acceptable', 'Needs Improvement']
};

const colors = {
    excellent: '#2D5F3F',
    veryGood: '#4A8B5C',
    good: '#7CB342',
    acceptable: '#FFA726',
    needsImprovement: '#E53935'
};

const ratingColors = [colors.excellent, colors.veryGood, colors.good, colors.acceptable, colors.needsImprovement];

const translations = {
    ar: {
        mainTitle: 'تحليل تقييمات الإفصاحات - ESG & TCFD',
        tabEsg: 'تحليل ESG',
        tabTcfd: 'تحليل TCFD',
        tabComparison: 'مقارنة',
        totalCompanies: 'إجمالي الشركات',
        excellent: 'ممتاز',
        veryGood: 'جيد جدًا',
        good: 'جيد',
        acceptable: 'مقبول',
        needsImprovement: 'يحتاج إلى تحسين',
        esgNonListedTitle: 'الشركات المالية غير المصرفية غير مقيدة بالبورصة',
        esgListedTitle: 'الشركات المقيدة بالبورصة',
        tcfdNonListedTitle: 'الشركات المالية غير المصرفية غير مقيدة بالبورصة',
        tcfdListedTitle: 'الشركات المقيدة بالبورصة',
        esgNonListedPieTitle: 'التوزيع العام للتقييمات',
        esgListedPieTitle: 'التوزيع العام للتقييمات',
        esgSectorsBarTitle: 'التوزيع حسب القطاع المالي',
        esgListedNonBankTitle: 'الشركات المالية غير المصرفية',
        esgListedOtherTitle: 'القطاعات الأخرى',
        tcfdNonListedPieTitle: 'التوزيع العام للتقييمات',
        tcfdCapitalMarketTitle: 'قطاع سوق المال 📈',
        tcfdInsuranceTitle: 'قطاع التأمين 🛡️',
        tcfdFinancingSectorsTitle: 'قطاعات التمويل المجمعة',
        tcfdListedNonBankTitle: 'الشركات المالية غير المصرفية',
        tcfdListedOtherTitle: 'القطاعات الأخرى',
        comparisonTotalTitle: 'إجمالي الشركات',
        comparisonRatingsTitle: 'توزيع التقييمات',
        comparisonPercentTitle: 'النسب المئوية'
    },
    en: {
        mainTitle: 'ESG & TCFD Disclosure Ratings Analysis',
        tabEsg: 'ESG Analysis',
        tabTcfd: 'TCFD Analysis',
        tabComparison: 'Comparison',
        totalCompanies: 'Total Companies',
        excellent: 'Excellent',
        veryGood: 'Very Good',
        good: 'Good',
        acceptable: 'Acceptable',
        needsImprovement: 'Needs Improvement',
        esgNonListedTitle: 'Non-Listed Non-Banking Financial Companies',
        esgListedTitle: 'Listed Companies',
        tcfdNonListedTitle: 'Non-Listed Non-Banking Financial Companies',
        tcfdListedTitle: 'Listed Companies',
        esgNonListedPieTitle: 'Overall Rating Distribution',
        esgListedPieTitle: 'Overall Rating Distribution',
        esgSectorsBarTitle: 'Distribution by Financial Sector',
        esgListedNonBankTitle: 'Non-Banking Financial Companies',
        esgListedOtherTitle: 'Other Sectors',
        tcfdNonListedPieTitle: 'Overall Rating Distribution',
        tcfdCapitalMarketTitle: 'Capital Market Sector 📈',
        tcfdInsuranceTitle: 'Insurance Sector 🛡️',
        tcfdFinancingSectorsTitle: 'Combined Financing Sectors',
        tcfdListedNonBankTitle: 'Non-Banking Financial Companies',
        tcfdListedOtherTitle: 'Other Sectors',
        comparisonTotalTitle: 'Total Companies',
        comparisonRatingsTitle: 'Rating Distribution',
        comparisonPercentTitle: 'Percentages'
    }
};

const ratingIcons = {
    excellent: '⭐',
    veryGood: '✨',
    good: '👍',
    acceptable: '✓',
    needsImprovement: '⚠️',
    total: '📊'
};

// Initialize
function init() {
    createESGSummary();
    createTCFDSummary();
    createESGCharts();
    createTCFDCharts();
    createComparisonCharts();
}

// Language toggle
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    const html = document.documentElement;
    html.setAttribute('lang', currentLang);
    html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    
    document.getElementById('langToggle').textContent = currentLang === 'ar' ? 'English' : 'العربية';
    updateTexts();
    updateCharts();
}

function updateTexts() {
    const t = translations[currentLang];
    document.getElementById('mainTitle').textContent = t.mainTitle;
    document.getElementById('tabEsg').textContent = t.tabEsg;
    document.getElementById('tabTcfd').textContent = t.tabTcfd;
    document.getElementById('tabComparison').textContent = t.tabComparison;
    
    // Update section titles
    document.getElementById('esgNonListedTitle').textContent = t.esgNonListedTitle;
    document.getElementById('esgListedTitle').textContent = t.esgListedTitle;
    document.getElementById('tcfdNonListedTitle').textContent = t.tcfdNonListedTitle;
    document.getElementById('tcfdListedTitle').textContent = t.tcfdListedTitle;
    
    // Update chart titles
    document.getElementById('esgNonListedPieTitle').textContent = t.esgNonListedPieTitle;
    document.getElementById('esgListedPieTitle').textContent = t.esgListedPieTitle;
    document.getElementById('esgSectorsBarTitle').textContent = t.esgSectorsBarTitle;
    document.getElementById('esgListedNonBankTitle').textContent = t.esgListedNonBankTitle;
    document.getElementById('esgListedOtherTitle').textContent = t.esgListedOtherTitle;
    document.getElementById('tcfdNonListedPieTitle').textContent = t.tcfdNonListedPieTitle;
    document.getElementById('tcfdCapitalMarketTitle').textContent = t.tcfdCapitalMarketTitle;
    document.getElementById('tcfdInsuranceTitle').textContent = t.tcfdInsuranceTitle;
    document.getElementById('tcfdFinancingSectorsTitle').textContent = t.tcfdFinancingSectorsTitle;
    document.getElementById('tcfdListedNonBankTitle').textContent = t.tcfdListedNonBankTitle;
    document.getElementById('tcfdListedOtherTitle').textContent = t.tcfdListedOtherTitle;
    document.getElementById('comparisonTotalTitle').textContent = t.comparisonTotalTitle;
    document.getElementById('comparisonRatingsTitle').textContent = t.comparisonRatingsTitle;
    document.getElementById('comparisonPercentTitle').textContent = t.comparisonPercentTitle;
    
    // Update summary cards
    createESGSummary();
    createTCFDSummary();
}

// Tab switching
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (tabName === 'esg') {
        document.getElementById('esgTab').classList.add('active');
        document.getElementById('tabEsg').classList.add('active');
    } else if (tabName === 'tcfd') {
        document.getElementById('tcfdTab').classList.add('active');
        document.getElementById('tabTcfd').classList.add('active');
    } else if (tabName === 'comparison') {
        document.getElementById('comparisonTab').classList.add('active');
        document.getElementById('tabComparison').classList.add('active');
    }
}

// Summary cards
function createESGSummary() {
    const container = document.getElementById('esgSummary');
    const t = translations[currentLang];
    
    const summaryData = [
        { label: t.totalCompanies, value: esgData.totalCompanies, icon: ratingIcons.total, color: '#1976D2' },
        { label: t.excellent, value: 14, icon: ratingIcons.excellent, color: colors.excellent },
        { label: t.veryGood, value: 49, icon: ratingIcons.veryGood, color: colors.veryGood },
        { label: t.good, value: 70, icon: ratingIcons.good, color: colors.good },
        { label: t.acceptable, value: 90, icon: ratingIcons.acceptable, color: colors.acceptable },
        { label: t.needsImprovement, value: 150, icon: ratingIcons.needsImprovement, color: colors.needsImprovement }
    ];
    
    container.innerHTML = summaryData.map(item => `
        <div class="summary-card">
            <div class="icon">${item.icon}</div>
            <div class="value" style="color: ${item.color}">${item.value}</div>
            <div class="label">${item.label}</div>
        </div>
    `).join('');
}

function createTCFDSummary() {
    const container = document.getElementById('tcfdSummary');
    const t = translations[currentLang];
    
    const summaryData = [
        { label: t.totalCompanies, value: tcfdData.totalCompanies, icon: ratingIcons.total, color: '#1976D2' },
        { label: t.excellent, value: 7, icon: ratingIcons.excellent, color: colors.excellent },
        { label: t.veryGood, value: 16, icon: ratingIcons.veryGood, color: colors.veryGood },
        { label: t.good, value: 31, icon: ratingIcons.good, color: colors.good },
        { label: t.acceptable, value: 46, icon: ratingIcons.acceptable, color: colors.acceptable },
        { label: t.needsImprovement, value: 70, icon: ratingIcons.needsImprovement, color: colors.needsImprovement }
    ];
    
    container.innerHTML = summaryData.map(item => `
        <div class="summary-card">
            <div class="icon">${item.icon}</div>
            <div class="value" style="color: ${item.color}">${item.value}</div>
            <div class="label">${item.label}</div>
        </div>
    `).join('');
}

// ESG Charts
function createESGCharts() {
    // Non-listed pie chart
    charts.esgNonListedPie = new Chart(document.getElementById('esgNonListedPie'), {
        type: 'pie',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                data: [
                    esgData.nonListedRatings.excellent,
                    esgData.nonListedRatings.veryGood,
                    esgData.nonListedRatings.good,
                    esgData.nonListedRatings.acceptable,
                    esgData.nonListedRatings.needsImprovement
                ],
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: currentLang === 'ar' ? 'right' : 'left',
                    rtl: currentLang === 'ar'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
    
    // Sectors bar chart
    const sectorLabels = esgData.nonListedSectors.map(s => currentLang === 'ar' ? s.nameAr : s.nameEn);
    const datasets = ratingLabels[currentLang].map((label, idx) => ({
        label: label,
        data: esgData.nonListedSectors.map(s => s.ratings[idx]),
        backgroundColor: ratingColors[idx]
    }));
    
    charts.esgSectorsBar = new Chart(document.getElementById('esgSectorsBar'), {
        type: 'bar',
        data: {
            labels: sectorLabels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    rtl: currentLang === 'ar'
                }
            },
            scales: {
                x: {
                    stacked: false,
                    reverse: currentLang === 'ar'
                },
                y: {
                    stacked: false,
                    beginAtZero: true
                }
            }
        }
    });
    
    // Listed pie chart
    charts.esgListedPie = new Chart(document.getElementById('esgListedPie'), {
        type: 'pie',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                data: [
                    esgData.listedRatings.excellent,
                    esgData.listedRatings.veryGood,
                    esgData.listedRatings.good,
                    esgData.listedRatings.acceptable,
                    esgData.listedRatings.needsImprovement
                ],
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: currentLang === 'ar' ? 'right' : 'left',
                    rtl: currentLang === 'ar'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
    
    // Listed non-banking bar chart
    charts.esgListedNonBank = new Chart(document.getElementById('esgListedNonBank'), {
        type: 'bar',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                label: currentLang === 'ar' ? 'عدد الشركات' : 'Number of Companies',
                data: esgData.listedNonBanking,
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    reverse: currentLang === 'ar'
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Listed other sectors bar chart
    charts.esgListedOther = new Chart(document.getElementById('esgListedOther'), {
        type: 'bar',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                label: currentLang === 'ar' ? 'عدد الشركات' : 'Number of Companies',
                data: esgData.listedOtherSectors,
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    reverse: currentLang === 'ar'
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// TCFD Charts
function createTCFDCharts() {
    // Non-listed pie chart
    charts.tcfdNonListedPie = new Chart(document.getElementById('tcfdNonListedPie'), {
        type: 'pie',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                data: [
                    tcfdData.nonListedRatings.excellent,
                    tcfdData.nonListedRatings.veryGood,
                    tcfdData.nonListedRatings.good,
                    tcfdData.nonListedRatings.acceptable,
                    tcfdData.nonListedRatings.needsImprovement
                ],
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: currentLang === 'ar' ? 'right' : 'left',
                    rtl: currentLang === 'ar'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
    
    // Capital Market bar chart
    charts.tcfdCapitalMarket = new Chart(document.getElementById('tcfdCapitalMarket'), {
        type: 'bar',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                label: currentLang === 'ar' ? 'عدد الشركات' : 'Number of Companies',
                data: tcfdData.capitalMarket,
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    reverse: currentLang === 'ar'
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Insurance bar chart
    charts.tcfdInsurance = new Chart(document.getElementById('tcfdInsurance'), {
        type: 'bar',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                label: currentLang === 'ar' ? 'عدد الشركات' : 'Number of Companies',
                data: tcfdData.insurance,
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    reverse: currentLang === 'ar'
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Financing sectors grouped bar chart
    const financingLabels = tcfdData.financingSectors.map(s => currentLang === 'ar' ? s.nameAr : s.nameEn);
    const financingDatasets = ratingLabels[currentLang].map((label, idx) => ({
        label: label,
        data: tcfdData.financingSectors.map(s => s.ratings[idx]),
        backgroundColor: ratingColors[idx]
    }));
    
    charts.tcfdFinancingSectors = new Chart(document.getElementById('tcfdFinancingSectors'), {
        type: 'bar',
        data: {
            labels: financingLabels,
            datasets: financingDatasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    rtl: currentLang === 'ar'
                }
            },
            scales: {
                x: {
                    stacked: false,
                    reverse: currentLang === 'ar'
                },
                y: {
                    stacked: false,
                    beginAtZero: true
                }
            }
        }
    });
    
    // Listed non-banking bar chart
    charts.tcfdListedNonBank = new Chart(document.getElementById('tcfdListedNonBank'), {
        type: 'bar',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                label: currentLang === 'ar' ? 'عدد الشركات' : 'Number of Companies',
                data: tcfdData.listedNonBanking,
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    reverse: currentLang === 'ar'
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Listed other sectors bar chart
    charts.tcfdListedOther = new Chart(document.getElementById('tcfdListedOther'), {
        type: 'bar',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                label: currentLang === 'ar' ? 'عدد الشركات' : 'Number of Companies',
                data: tcfdData.listedOtherSectors,
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    reverse: currentLang === 'ar'
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Comparison Charts
function createComparisonCharts() {
    // Total companies comparison
    charts.comparisonTotal = new Chart(document.getElementById('comparisonTotal'), {
        type: 'bar',
        data: {
            labels: ['ESG', 'TCFD'],
            datasets: [{
                label: currentLang === 'ar' ? 'عدد الشركات' : 'Number of Companies',
                data: [esgData.totalCompanies, tcfdData.totalCompanies],
                backgroundColor: ['#2196F3', '#4A8B5C']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Rating distribution comparison
    const esgTotals = [
        14, // excellent
        49, // very good
        70, // good
        90, // acceptable
        150 // needs improvement
    ];
    
    const tcfdTotals = [
        7, // excellent
        16, // very good
        31, // good
        46, // acceptable
        70 // needs improvement
    ];
    
    charts.comparisonRatings = new Chart(document.getElementById('comparisonRatings'), {
        type: 'bar',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [
                {
                    label: 'ESG',
                    data: esgTotals,
                    backgroundColor: '#2196F3'
                },
                {
                    label: 'TCFD',
                    data: tcfdTotals,
                    backgroundColor: '#4A8B5C'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    rtl: currentLang === 'ar'
                }
            },
            scales: {
                x: {
                    reverse: currentLang === 'ar'
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Percentage comparison
    const esgPercentages = esgTotals.map(v => (v / esgData.totalCompanies * 100).toFixed(1));
    const tcfdPercentages = tcfdTotals.map(v => (v / tcfdData.totalCompanies * 100).toFixed(1));
    
    charts.comparisonPercent = new Chart(document.getElementById('comparisonPercent'), {
        type: 'bar',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [
                {
                    label: 'ESG %',
                    data: esgPercentages,
                    backgroundColor: '#2196F3'
                },
                {
                    label: 'TCFD %',
                    data: tcfdPercentages,
                    backgroundColor: '#4A8B5C'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    rtl: currentLang === 'ar'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    reverse: currentLang === 'ar'
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Update all charts when language changes
function updateCharts() {
    // Destroy existing charts
    Object.keys(charts).forEach(key => {
        if (charts[key]) {
            charts[key].destroy();
        }
    });
    
    // Recreate all charts
    createESGCharts();
    createTCFDCharts();
    createComparisonCharts();
}

// Initialize on load
window.addEventListener('DOMContentLoaded', init);