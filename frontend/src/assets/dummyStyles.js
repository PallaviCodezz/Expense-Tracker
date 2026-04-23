export const dashboardStyles = {
  // Layout styles
  container: "min-h-screen p-4 md:p-6",
  
  // Header styles
  headerContainer: "bg-gradient-to-r from-cyan-500/15 to-teal-500/10 backdrop-blur-xl rounded-3xl p-6 mb-8 shadow-lg border border-cyan-400/20",
  headerContent: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8",
  headerTitle: "font-display text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent text-glow",
  headerSubtitle: "text-cyan-100/70 mt-2",
  
  // Button styles
  addButton: "flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 px-5 py-3 rounded-xl transition-all shadow hover:shadow-md font-semibold",
  
  // Time frame selector styles
  timeFrameContainer: "flex justify-end mt-4",
  timeFrameWrapper: "flex gap-0 bg-[#0f1c33] p-1 -mx-5 rounded-xl border border-cyan-900/50",
  timeFrameButton: (isActive) => 
    `px-2.5 py-2 text-sm rounded-lg transition-all ${
      isActive 
        ? "bg-teal-500 text-white" 
        : "text-cyan-100/80 hover:bg-slate-800/60"
    }`,
  
  // Summary cards grid
  summaryGrid: "grid grid-cols-1 lg:-mx-3 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-8",
  
  // Financial card styles
  balanceBadge: "bg-teal-100 text-teal-800 px-2 py-1 rounded-lg text-xs",
  expenseBadge: "bg-orange-100 text-orange-800 px-1 py-1 rounded-lg text-xs",
  
  // Gauge container styles
  gaugeGrid: "grid grid-cols-1 -mx-5 xl:-mx-5 md:grid-cols-3 md:gap-13 lg:gap-3 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8",
  
  // Pie chart container styles
  pieChartContainer: "hidden md:block bg-[#0f1c33]/95 lg:-mx-5.5 md:-mx-4 lg:p-1 xl:-mx-3 rounded-xl p-5 shadow-sm border border-cyan-900/40 relative overflow-hidden mb-8",
  pieChartHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3",
  pieChartTitle: "text-xl lg:pt-3 xl:pl-3 font-bold text-cyan-50 mb-5 flex items-center gap-3",
  pieChartSubtitle: "text-sm lg:text-center xl:text-start xl:pl-3 text-cyan-100/70 mb-3",
  pieChartHeight: "h-90 xl:h-80",
  
  // Pie chart tooltip styles
  tooltipContent: {
    backgroundColor: "rgba(12, 23, 42, 0.95)",
    border: "1px solid #1f3b60",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "12px",
  },
  tooltipItem: { fontWeight: 400 },
  
  // Legend styles
  legendWrapper: { paddingTop: 8 },
  legendText: "text-sm font-medium text-cyan-100/80",
  
  // Income/Expense lists grid
  listsGrid: "grid grid-cols-1 gap-6",
  
  // List container styles
  listContainer: "bg-[#0f1c33]/95 rounded-2xl lg:p-5 md:p-6 -mx-8 md:-mx-3 shadow-sm border border-cyan-900/40",
  listHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3",
  listTitle: "font-display text-xl font-bold text-cyan-50 md:mt-3 mt-3 flex items-center gap-3",
  listSubtitle: "text-sm text-cyan-100/70 font-normal",
  
  // Record count badges
  incomeCountBadge: "text-sm bg-green-100 px-2 mx-2 text-green-800 md:mx-2 md:mt-2 py-1 rounded-full",
  expenseCountBadge: "text-sm bg-orange-100 text-orange-800 px-2 mx-2 md:mx-2 md:mt-2 py-1 rounded-full",
  
  // Transaction item styles
  transactionList: "space-y-3",
  incomeTransactionItem: "flex items-center px-2 mx-2 my-2 md:p-4 md:mx-2 lg:px-3 justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg",
  expenseTransactionItem: "flex items-center justify-between mx-1 p-3 lg:p-3 md:p-4 md:mx-2 bg-orange-500/10 border border-orange-500/20 rounded-lg",
  
  // Transaction icon container
  incomeIconContainer: "p-2 bg-green-500/20 rounded-lg",
  expenseIconContainer: "p-2 bg-orange-500/20 rounded-lg",
  
  // Transaction content
  transactionContent: "flex items-center lg:gap-3 md:gap-3 gap-1",
  transactionDescription: "font-medium text-cyan-50",
  transactionCategory: "text-sm text-cyan-100/60",
  transactionAmount: "text-right",
  incomeAmount: "font-bold text-green-400",
  expenseAmount: "font-bold text-orange-400",
  transactionDate: "text-sm text-cyan-100/60",
  
  // Empty state styles
  emptyState: "text-center py-8",
  emptyIconContainer: (color) => `w-16 h-16 mx-auto mb-4 rounded-full ${color} flex items-center justify-center`,
  emptyText: "text-cyan-100/70 font-medium",
  
  // View all button styles
  viewAllContainer: "pt-4 border-t border-cyan-900/40",
  viewAllButton: "w-full flex items-center justify-center gap-2 py-3 text-teal-400 font-medium hover:bg-teal-500/10 rounded-xl transition-colors",
  
  // Icon container styles
  iconContainer: (color) => `p-2 ${color} rounded-lg`,
  
  // Specific icon colors
  walletIconContainer: "p-2 bg-teal-100 rounded-lg",
  arrowDownIconContainer: "p-2 bg-orange-100 rounded-lg",
  piggyBankIconContainer: "p-2 bg-cyan-100 rounded-lg",
};

// Additional styles for financial trends
export const trendStyles = {
  positive: "text-orange-600",
  negative: "text-green-600",
  positiveRate: "bg-teal-100 text-teal-700",
  negativeRate: "bg-red-100 text-red-700",
};

// Chart specific styles
export const chartStyles = {
  pieChart: "lg:-px-5 lg:text-xs xl:text-xl",
};

export const incomeStyles = {
  // Layout
  wrapper: "space-y-4 md:space-y-6 p-3 md:p-4 max-w-7xl mx-auto",
  headerContainer: "bg-[#0f1c33]/95 rounded-lg md:rounded-xl p-4 -mx-7 lg:-mx-7 overflow-x-hidden md:p-6 mb-6 md:mb-8 shadow-sm border border-cyan-900/40",
  header: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-6",
  headerTitle: "text-xl md:text-2xl lg:text-3xl font-bold text-cyan-50",
  headerSubtitle: "text-cyan-100/70 mt-1 text-sm md:text-base",
  addButton: "flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl transition-all shadow-md hover:shadow-lg font-medium text-sm md:text-base",
  
  // Summary Cards
  summaryGrid: "grid grid-cols-1 -mx-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5",
  
  // Chart
  chartContainer: "hidden md:block -mx-7 bg-[#0f1c33]/95 lg:-mx-0 md:-mx-0 rounded-xl p-6 shadow-sm border border-cyan-900/40",
  chartTitle: "text-lg md:text-xl font-bold text-cyan-50 mb-4 md:mb-5 flex items-center gap-2 md:gap-3",
  
  // Transaction List
  listContainer: "bg-[#0f1c33]/95 rounded-2xl p-4 md:p-6 -mx-4 lg:-mx-0 md:-mx-0 shadow-sm border border-cyan-900/40 relative overflow-hidden",
  sectionTitle: "text-lg md:text-xl font-bold text-cyan-50 mb-4 md:mb-5 flex items-center gap-2 md:gap-3",
  
  // Filter Section
  filterContainer: "flex flex-col sm:flex-row gap-2 md:gap-3 w-full sm:w-auto",
  filterSelect: "appearance-none bg-[#0f1c33] text-cyan-100 border border-cyan-900/50 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full",
  exportButton: "flex items-center justify-center gap-1 bg-[#0f1c33] border border-cyan-900/50 hover:bg-[#1a2f4a] text-cyan-100 px-3 py-2 rounded-lg transition-all text-sm hover:shadow-md w-full sm:w-auto",
  
  // Transaction Items
  transactionList: "space-y-3 -mx-3 lg:-mx-0 md:-mx-0",
  viewAllButton: "mt-4 w-full text-center py-3 text-green-400 font-medium hover:bg-green-500/10 rounded-xl transition-colors flex items-center justify-center gap-2",
  
  // Empty State
  emptyStateContainer: "text-center py-6 md:py-8",
  emptyStateIcon: "w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-green-500/10 flex items-center justify-center",
  emptyStateText: "text-cyan-100/80 font-medium text-sm md:text-base",
  emptyStateSubtext: "text-xs md:text-sm text-cyan-100/50 mt-1 md:mt-2",
  emptyStateButton: "mt-3 md:mt-4 flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl transition-all shadow-md hover:shadow-lg mx-auto text-sm md:text-base",
  
  // Time Frame Selector Container
  timeFrameContainer: "flex px-10 -mx-14 justify-center lg:-mx-0 md:-mx-0 lg:justify-end md:justify-end mt-4",

   // Chart header container 
  chartHeaderContainer: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5",
  
  // Chart height 
  chartHeight: "h-64 md:h-80",
  
  // Chart tooltip styles 
  tooltipContent: {
    backgroundColor: "rgba(12, 23, 42, 0.95)",
    border: "1px solid #1f3b60",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    padding: "12px",
    color: "#dff8ff",
  },
  
  // Icon container styles for summary cards 
  iconGreen: "p-2 bg-green-100 rounded-lg",
  iconBlue: "p-2 bg-blue-100 rounded-lg",
  iconPurple: "p-2 bg-purple-100 rounded-lg",
  
  // Icon text colors 
  textGreen: "text-green-600",
  textBlue: "text-blue-600",
  textPurple: "text-purple-600",
  
  // Filter icon positioning 
  filterIcon: "absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-cyan-100/60 pointer-events-none",
  
  // FinancialCard border colors (if needed, similar to expense page)
  borderGreen: "border-l-4 border-green-500",
  borderBlue: "border-l-4 border-blue-500",
  borderPurple: "border-l-4 border-purple-500",
};

export const expensePageStyles = {
  // Main container
  container: "space-y-6 max-w-7xl",
  
  // Header card
  headerCard: "bg-[#0f1c33]/95 rounded-xl p-4  lg:-mx-0 -mx-3.5  overflow-x-hidden mb-8 shadow-sm border border-cyan-900/40",
  headerContainer: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-6",
  headerTitle: "text-2xl md:text-3xl font-bold text-cyan-50",
  headerSubtitle: "text-cyan-100/70 mt-1",
  addButton: "flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-3 rounded-xl transition-all shadow-md hover:shadow-lg font-medium",
  
  // Financial cards grid
  cardsGrid: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-5",
  
  // Chart container
  chartContainer: "hidden md:block bg-[#0f1c33]/95 rounded-xl p-4 -mx-7 lg:-mx-0 shadow-sm border border-cyan-900/40",
  chartHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5",
  chartTitle: "text-xl font-bold text-cyan-50 mb-5 flex items-center gap-3",
  exportButton: "flex items-center gap-1 bg-[#0f1c33] border border-cyan-900/50 hover:bg-[#1a2f4a] text-cyan-100 px-4 py-2 rounded-lg transition-all text-sm hover:shadow-md",
  chart: "h-80",
  
  // Transactions container
  transactionsContainer: "bg-[#0f1c33]/95 rounded-2xl p-5 -mx-4 lg:-mx-0 md:-mx-5 shadow-sm border border-cyan-900/40 relative overflow-hidden",
  transactionsHeader: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-5",
  transactionsTitle: "text-lg md:text-xl font-bold text-cyan-50 mb-4 md:mb-5 flex items-center gap-2 md:gap-3",
  filterSelect: "appearance-none bg-[#0f1c33] text-cyan-100 border border-cyan-900/50 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full",
  
  // Transaction items
  transactionsList: "space-y-3 -mx-2 lg:-mx-0 md:-mx-0",
  viewAllButton: "mt-4 w-full text-center py-3 text-orange-400 font-medium hover:bg-orange-500/10 rounded-xl transition-colors flex items-center justify-center gap-2",
  emptyState: "text-center py-8",
  emptyStateIcon: "w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center",
  emptyStateText: "text-cyan-100/80 font-medium",
  emptyStateSubtext: "text-sm text-cyan-100/50 mt-2",
  
  // Icons
  iconOrange: "p-2 bg-orange-100 rounded-lg",
  iconAmber: "p-2 bg-amber-100 rounded-lg",
  iconYellow: "p-2 bg-yellow-100 rounded-lg",
  textOrange: "text-orange-600",
  textAmber: "text-amber-600",
  textYellow: "text-yellow-600",
  
  // Borders
  borderOrange: "border-l-4 border-orange-500",
  borderAmber: "border-l-4 border-amber-500",
  borderYellow: "border-l-4 border-yellow-500",
  // Chart tooltip styles 
  tooltipContent: {
    backgroundColor: "rgba(12, 23, 42, 0.95)",
    border: "1px solid #1f3b60",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "12px",
    backdropFilter: "blur(4px)",
  },
  
  // Chart height style 
  chartHeight: "h-80",
  
  // Transaction item specific styles 
  transactionItemContainer: "flex items-center justify-between p-3 -mx-2 hover:bg-amber-50 rounded-xl transition-all duration-300 border border-cyan-900/40 cursor-pointer mb-3 group",
  transactionAmount: "font-bold",
  transactionIcon: "lg:p-3 md:p-3 p-1 rounded-lg",
};

export const profileStyles = {
  // Container styles
  container: "max-w-4xl mx-auto py-8 px-4",
  mainContainer: "bg-[#0f1c33]/95 -mx-7 rounded-2xl shadow-sm overflow-hidden border border-cyan-900/40",
  
  // Header styles
  header: "bg-gradient-to-r from-cyan-500 to-teal-500 p-8 text-center",
  avatar: "w-24 h-24 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4",
  userName: "font-display text-2xl font-bold text-slate-950",
  userEmail: "text-slate-900/70 mt-2",
  
  // Content styles
  content: "p-8 -mx-6.5",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-8",
  
  // Card styles
  card: "bg-[#09162b] rounded-xl p-6 border border-cyan-900/40",
  cardTitle: "font-display text-xl font-semibold pb-3 text-cyan-50 flex items-center",
  icon: "w-5 h-5 mr-2 text-teal-600",
  
  // Form styles
  label: "text-sm text-cyan-100/70 block mb-1",
  input: "w-full px-4 py-2 bg-[#0f1c33] text-cyan-50 border border-cyan-900/50 rounded-lg focus:ring-2 focus:ring-cyan-300/60 focus:border-cyan-400",
  inputWithError: "w-full px-4 py-2 bg-[#0f1c33] text-cyan-50 border rounded-lg focus:ring-2 focus:ring-cyan-300/60 focus:border-cyan-400",
  
  // Button styles
  buttonPrimary: "flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 py-2.5 rounded-xl font-semibold shadow-md",
  buttonSecondary: "flex-1 py-2.5 border border-cyan-900/50 text-cyan-100 rounded-xl font-medium hover:bg-cyan-900/20",
  editButton: "text-cyan-300 hover:text-cyan-200 font-medium text-sm",
  changeButton: "text-cyan-300 hover:text-cyan-200 font-medium lg:text-sm",
  
  // Security item
  securityItem: "flex items-center justify-between p-4 bg-[#0f1c33] rounded-xl border border-cyan-900/40",
  securityText: "font-medium lg:text-sm text-cyan-100/60",
  
  // Modal styles
  modalContent: "bg-[#0f1c33] rounded-2xl p-6 lg:px-28 w-full max-w-md border border-cyan-900/40",
  modalHeader: "flex justify-between lg:whitespace-nowrap lg:space-x-20 mb-6",
  modalTitle: "font-display text-xl font-bold lg:pl-10 text-cyan-50",
  
  // Password input
  passwordLabel: "block text-sm font-medium text-cyan-100/80 mb-1",
  passwordContainer: "relative",
  passwordToggle: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",
  
  // Error text
  errorText: "mt-1 text-sm text-red-600",
  
  // Avatar
  profileAvatar: "w-20 h-20 mx-auto rounded-full bg-slate-900/25 flex items-center justify-center mb-4",
  headerTitle: "font-display text-2xl font-bold text-slate-950",
  headerSubtitle: "text-slate-900/70 mt-2",
  backButton: "absolute top-4 left-4 p-2 text-slate-900 rounded-full hover:bg-slate-900/10 transition-colors",
  
  // Form container (reusing from login)
  formContainer: "p-8",
};

export const signupStyles = {
  // Main container
  pageContainer: "min-h-screen flex items-center justify-center",
  
  // Form card
  cardContainer: "bg-[#0f1c33]/95 backdrop-blur-xl border border-cyan-900/40 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4",
  
  // Header
  header: "text-center mb-6 relative",
  avatar: "w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center",
  headerTitle: "font-display text-2xl font-bold text-cyan-50 mb-2",
  headerSubtitle: "text-cyan-100/60",
  
  // Back button
  backButton: "absolute left-0 top-0 p-2 rounded-lg text-cyan-100/60 hover:text-cyan-100 hover:bg-cyan-900/30 transition-colors",
  
  // Form elements
  formContainer: "space-y-4",
  inputContainer: "relative",
  input: "w-full pl-10 pr-4 py-3 bg-[#09162b] text-cyan-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/40 placeholder:text-cyan-100/30",
  passwordInput: "w-full pl-10 pr-12 py-3 bg-[#09162b] text-cyan-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/40 placeholder:text-cyan-100/30",
  inputIcon: "absolute left-3 top-1/2 -translate-y-1/2 text-cyan-100/40 w-5 h-5",
  passwordToggle: "absolute right-3 top-1/2 -translate-y-1/2 text-cyan-100/40 hover:text-cyan-100/80 w-5 h-5",
  
  // Label
  label: "block text-sm font-medium text-cyan-100/80 mb-1",
  
  // Checkbox
  checkboxContainer: "flex items-center gap-2",
  checkbox: "w-4 h-4 accent-cyan-500 rounded",
  checkboxLabel: "text-sm text-cyan-100/70",
  
  // Button
  button: "w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-600 text-slate-950 py-3 rounded-xl font-semibold hover:from-cyan-400 hover:to-teal-500 transition-all shadow-lg",
  buttonDisabled: "opacity-60 cursor-not-allowed",
  
  // Errors
  apiError: "text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-2",
  fieldError: "text-red-400 text-xs mt-1",
  
  // Footer
  signInContainer: "text-center mt-6",
  signInText: "text-cyan-100/60",
  signInLink: "text-cyan-400 hover:text-cyan-300 font-medium",
  
  // Spinner
  spinner: "animate-spin h-4 w-4",
};

export const modalStyles = {
  overlay: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4",
  modalContainer: "bg-[#0f1c33] border border-cyan-900/40 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto",
  modalHeader: "flex justify-between items-center px-6 pt-6 pb-4 border-b border-cyan-900/40",
  modalTitle: "font-display text-xl font-bold text-cyan-50",
  closeButton: "p-2 rounded-lg text-cyan-100/60 hover:text-cyan-100 hover:bg-cyan-900/30 transition-colors",
  form: "px-6 py-5 space-y-4",
  label: "block text-sm font-medium text-cyan-100/80 mb-1",
  input: (ring) => `w-full px-4 py-2.5 bg-[#09162b] text-cyan-50 border border-cyan-900/50 rounded-xl focus:outline-none focus:ring-2 ${ring} placeholder:text-cyan-100/30`,
  typeButtonContainer: "flex gap-2",
  typeButton: (isActive, activeClass) => `flex-1 py-2 rounded-xl text-sm font-medium transition-all border ${isActive ? activeClass : "border-cyan-900/50 text-cyan-100/60 hover:bg-cyan-900/20"}`,
  submitButton: (btnClass) => `w-full py-3 rounded-xl font-semibold text-sm transition-all shadow-md ${btnClass}`,
  colorClasses: {
    teal: {
      ring: "focus:ring-teal-500/40",
      button: "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950",
      typeButtonSelected: "bg-teal-500/20 border-teal-500/60 text-teal-300",
    },
    orange: {
      ring: "focus:ring-orange-500/40",
      button: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white",
      typeButtonSelected: "bg-orange-500/20 border-orange-500/60 text-orange-300",
    },
    green: {
      ring: "focus:ring-green-500/40",
      button: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white",
      typeButtonSelected: "bg-green-500/20 border-green-500/60 text-green-300",
    },
  },
};

export const navbarStyles = {
  header: "sticky top-0 z-30 bg-[#0a1629]/95 backdrop-blur-md border-b border-cyan-900/40 shadow-lg",
  container: "max-w-screen-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between",
  logoContainer: "flex items-center gap-2 cursor-pointer select-none",
  logoText: "font-display text-xl font-bold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent",
  userContainer: "relative",
  userButton: "flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-cyan-900/30 transition-all",
  userAvatar: "w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-sm font-bold text-slate-950",
  statusIndicator: "absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0a1629]",
  userTextContainer: "hidden sm:block text-left",
  userName: "text-sm font-semibold text-cyan-50 leading-tight",
  userEmail: "text-xs text-cyan-100/60 leading-tight truncate max-w-[140px]",
  chevronIcon: (open) => `w-4 h-4 text-cyan-100/60 transition-transform ${open ? "rotate-180" : ""}`,
  dropdownMenu: "absolute right-0 mt-2 w-56 bg-[#0f1c33] border border-cyan-900/50 rounded-2xl shadow-2xl overflow-hidden z-50",
  dropdownHeader: "px-4 py-3 border-b border-cyan-900/40 bg-cyan-900/10",
  dropdownAvatar: "w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-sm font-bold text-slate-950",
  dropdownName: "text-sm font-semibold text-cyan-50",
  dropdownEmail: "text-xs text-cyan-100/60 truncate",
  menuItemContainer: "px-2 py-2",
  menuItem: "flex items-center gap-2 w-full px-3 py-2 text-sm text-cyan-100 hover:bg-cyan-900/30 rounded-xl transition-colors",
  menuItemBorder: "px-2 py-2 border-t border-cyan-900/40",
  logoutButton: "flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors",
};

export const loginStyles = {
  // Main container
  pageContainer: "min-h-screen flex items-center justify-center",
  
  // Form card
  cardContainer: "bg-[#0f1c33]/95 backdrop-blur-xl border border-cyan-900/40 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4",
  
  // Header
  header: "text-center mb-8",
  avatar: "w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center",
  headerTitle: "font-display text-2xl font-bold text-cyan-50 mb-2",
  headerSubtitle: "text-cyan-100/60",
  
  // Form elements
  formContainer: "space-y-5",
  inputContainer: "relative",
  input: "w-full pl-10 pr-4 py-3 bg-[#09162b] text-cyan-50 border border-cyan-900/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/40 placeholder:text-cyan-100/30",
  passwordInput: "w-full pl-10 pr-12 py-3 bg-[#09162b] text-cyan-50 border border-cyan-900/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/40 placeholder:text-cyan-100/30",
  inputIcon: "absolute left-3 top-1/2 -translate-y-1/2 text-cyan-100/40 w-5 h-5",
  passwordToggle: "absolute right-3 top-1/2 -translate-y-1/2 text-cyan-100/40 hover:text-cyan-100/80 w-5 h-5",
  
  // Label
  label: "block text-sm font-medium text-cyan-100/80 mb-1",
  
  // Checkbox
  checkboxContainer: "flex items-center gap-2",
  checkbox: "w-4 h-4 accent-cyan-500 rounded border-cyan-900/50",
  checkboxLabel: "text-sm text-cyan-100/70",
  
  // Button
  button: "w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-600 text-slate-950 py-3 rounded-xl font-semibold hover:from-cyan-400 hover:to-teal-500 transition-all shadow-lg",
  buttonDisabled: "opacity-60 cursor-not-allowed",
  
  // Error
  errorContainer: "flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl mb-4",
  errorIcon: "text-red-400 flex-shrink-0",
  errorText: "text-red-400 text-sm",
  
  // Footer
  signUpContainer: "text-center mt-6",
  signUpText: "text-cyan-100/60",
  signUpLink: "text-cyan-400 hover:text-cyan-300 font-medium",
  
  // Spinner
  spinner: "animate-spin h-4 w-4",
};

export const transactionItemStyles = {
  // Content styles
  contentContainer: "min-w-0 flex-1",
  description: "font-medium text-cyan-50 truncate",
  details: "text-xs text-cyan-100/70 mt-1 truncate",
  
  // Input styles
  input: (hasError, classes) => 
    `w-full px-3 py-2 rounded-lg text-sm transition-colors ${
      hasError 
        ? 'border-red-500 bg-red-50 text-red-700 placeholder-red-400' 
        : `${classes.bg} ${classes.text} placeholder:${classes.text}/60`
    } focus:outline-none focus:ring-2 focus:ring-blue-500`,
  
  // Button styles
  saveButton: (classes) => `p-2 ${classes.button} rounded-lg`,
  cancelButton: "p-2 bg-[#1a2f4a] text-cyan-100 rounded-lg hover:bg-[#233855]",
  editButton: (classes) => `p-2 ${classes.text} rounded-lg hover:${classes.bg}`,
};

export const sidebarStyles = {
  sidebarContainer: {
    base: "hidden lg:flex flex-col fixed left-0 top-0 h-full bg-[#0a1629]/98 border-r border-cyan-900/40 transition-all duration-300 z-40",
  },
  sidebarInner: {
    base: "flex flex-col h-full overflow-hidden",
  },
  toggleButton: {
    base: "self-end m-3 p-2 rounded-lg text-cyan-100/60 hover:text-cyan-100 hover:bg-cyan-900/30 transition-colors",
  },
  userProfileContainer: {
    base: "flex flex-col items-center px-4 py-4 border-b border-cyan-900/40",
    collapsed: "px-2",
    expanded: "",
  },
  userInitials: {
    base: "w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-sm font-bold text-slate-950 flex-shrink-0",
  },
  menuList: {
    base: "space-y-1 px-3",
  },
  menuItem: {
    base: "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all",
    active: "bg-gradient-to-r from-cyan-500/20 to-teal-500/10 text-cyan-300 border border-cyan-500/30",
    inactive: "text-cyan-100/70 hover:bg-cyan-900/30 hover:text-cyan-100",
    collapsed: "justify-center px-2",
    expanded: "",
  },
  menuIcon: {
    active: "text-cyan-400",
    inactive: "text-cyan-100/60",
  },
  activeIndicator: "ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400",
  footerContainer: {
    base: "mt-auto px-3 py-4 border-t border-cyan-900/40",
    collapsed: "flex justify-center",
    expanded: "",
  },
  logoutButton: {
    base: "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all w-full",
    collapsed: "justify-center",
  },
  // Mobile
  mobileMenuButton: "lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-full flex items-center justify-center shadow-xl",
  mobileOverlay: "lg:hidden fixed inset-0 z-50 flex",
  mobileBackdrop: "absolute inset-0 bg-black/60 backdrop-blur-sm",
  mobileSidebar: {
    base: "relative flex flex-col w-72 h-full bg-[#0a1629] border-r border-cyan-900/40 shadow-2xl",
  },
  mobileHeader: "flex items-center justify-between px-4 py-4 border-b border-cyan-900/40",
  mobileUserContainer: "flex items-center gap-3",
  mobileCloseButton: "p-2 rounded-lg text-cyan-100/60 hover:text-cyan-100 hover:bg-cyan-900/30 transition-colors",
  mobileMenuList: "space-y-1",
  mobileMenuItem: {
    base: "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all",
    active: "bg-gradient-to-r from-cyan-500/20 to-teal-500/10 text-cyan-300 border border-cyan-500/30",
    inactive: "text-cyan-100/70 hover:bg-cyan-900/30 hover:text-cyan-100",
  },
  mobileFooter: "mt-auto px-4 py-4 border-t border-cyan-900/40",
  mobileLogoutButton: "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 w-full",
};

// Helper function to combine class names
export const cn = (...classes) => classes.filter(Boolean).join(" ");

export const styles = {
  // Layout and Container Styles
  layout: {
    root: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100",
    mainContainer: (sidebarCollapsed) => 
      `p-4 pt-6 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`,
  },

  // Header Styles
  header: {
    container: "flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4",
    title: "text-2xl font-bold text-gray-800",
    subtitle: "text-gray-600",
  },

  // Stat Card Styles
  statCards: {
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-6",
    card: "bg-white p-5 rounded-2xl shadow-sm border border-gray-100",
    cardHeader: "flex justify-between items-start",
    cardTitle: "text-sm text-gray-600",
    cardValue: "text-2xl font-bold text-gray-800 mt-1",
    iconContainer: (color) => `bg-${color}-100 p-2 rounded-lg`,
    icon: (color) => `w-5 h-5 text-${color}-600`,
    cardFooter: "text-xs text-gray-500 mt-3",
  },

  // Grid Layout
  grid: {
    main: "grid grid-cols-1 lg:grid-cols-3 gap-6",
    leftColumn: "lg:col-span-2 space-y-6",
    rightColumn: "lg:col-span-1 lg:-mx-3 space-y-6",
  },

  // Card Styles
  cards: {
    base: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
    header: "flex justify-between items-center mb-6",
    title: "text-xl font-bold text-gray-800 flex items-center gap-3",
    titleIcon: "w-6 h-6",
  },

  // Recent Transactions Card
  transactions: {
    cardHeader: "flex justify-between items-center mb-4",
    cardTitle: "text-md md:text-xl lg:text-xl xl:text-xl font-bold text-gray-800 flex items-center gap-3",
    refreshButton: "p-2 rounded-lg hover:bg-gray-100 transition-colors",
    refreshIcon: (loading) => `w-5 h-5 text-gray-500 ${loading ? 'animate-spin' : ''}`,
    dataStackingInfo: "flex items-center gap-2 text-xs text-gray-500 mb-4 bg-blue-50 p-2 rounded-lg",
    dataStackingIcon: "w-4 h-4 text-blue-500",
    listContainer: "space-y-4 max-h-[500px] -mx-5 overflow-y-auto pr-2",
    transactionItem: "flex items-center lg:flex-col xl:flex-row md:flex-row justify-between p-1 -mx-0 lg:p-4 md:p-4 hover:bg-gray-50 rounded-xl transition-all duration-300 border border-gray-100",
    iconWrapper: (type) => type === 'income' ? 'bg-teal-100 text-teal-600' : 'bg-orange-100 text-orange-600',
    icon: "w-4 h-4",
    details: "min-w-0",
    description: "font-medium text-gray-800 truncate max-w-[120px]",
    meta: "text-xs text-gray-500 mt-1",
    amount: (type) => `font-semibold ${type === 'income' ? 'text-teal-600' : 'text-orange-600'}`,
    emptyState: "text-center py-8",
    emptyIconContainer: "w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center",
    emptyIcon: "w-8 h-8 text-purple-500",
    emptyText: "text-gray-600 font-medium",
    viewAllContainer: "pt-4 border-t border-gray-100",
    viewAllButton: "w-full flex items-center justify-center gap-2 py-3 text-teal-600 font-medium hover:bg-teal-50 rounded-xl transition-colors",
  },

  // Spending by Category Card
  categories: {
    title: "text-lg md:text-xl lg:text-xl xl:text-xl font-bold text-gray-800 mb-6 flex items-center gap-3",
    titleIcon: "w-6 h-6 text-cyan-500",
    list: "space-y-4",
    categoryItem: "flex items-center md:text-lg lg:text-sm xl:text-lg justify-between",
    categoryIconContainer: "bg-gray-100 p-2 rounded-lg",
    categoryIcon: "w-4 h-4 text-gray-600",
    categoryName: "font-medium text-gray-700",
    categoryAmount: "font-semibold text-gray-800",
    summaryContainer: "mt-6 pt-6 border-t border-gray-100",
    summaryGrid: "grid grid-cols-2 gap-4",
    summaryIncomeCard: "bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4",
    summaryExpenseCard: "bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4",
    summaryTitle: "text-sm text-gray-600",
    summaryValue: "text-sm font-bold text-gray-800",
  },

  // Color Helpers
  colors: {
    transaction: {
      text: (type) => type === 'income' ? 'text-teal-600' : 'text-orange-600',
      bg: (type) => type === 'income' ? 'bg-teal-100 text-teal-600' : 'bg-orange-100 text-orange-600',
    },
    expenseChange: (change) => change > 0 ? 'text-orange-600' : 'text-green-600',
  },
};