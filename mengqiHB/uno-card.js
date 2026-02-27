/** genAI_main_start */
/**
 * UNO牌生成器模块
 * 提供随机生成UNO牌的功能
 */

// UNO牌常量配置
const UNO_CONFIG = {
  // 颜色配置
  COLORS: {
    RED: { name: 'red', displayName: '红色', hex: '#e74c3c', textColor: '#fff' },
    YELLOW: { name: 'yellow', displayName: '黄色', hex: '#f1c40f', textColor: '#2c3e50' },
    GREEN: { name: 'green', displayName: '绿色', hex: '#27ae60', textColor: '#fff' },
    BLUE: { name: 'blue', displayName: '蓝色', hex: '#3498db', textColor: '#fff' }
  },
  
  // 数字牌配置 (0-9)
  NUMBER_CARDS: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  
  // 功能牌类型
  ACTION_TYPES: {
    SKIP: { type: 'skip', symbol: '⊘', displayName: '跳过' },
    REVERSE: { type: 'reverse', symbol: '⇄', displayName: '反转' },
    DRAW_TWO: { type: 'draw_two', symbol: '+2', displayName: '加二' }
  },
  
  // 万能牌类型
  WILD_TYPES: {
    WILD: { type: 'wild', symbol: '◉', displayName: '变色', color: 'wild' },
    WILD_DRAW_FOUR: { type: 'wild_draw_four', symbol: '+4', displayName: '加四', color: 'wild' }
  },
  
  // 默认尺寸
  DEFAULT_SIZE: {
    width: 100,
    height: 150
  }
};

/**
 * UNO牌类
 */
class UnoCard {
  /**
   * 构造函数
   * @param {Object} cardData - UNO牌数据
   */
  constructor(cardData) {
    this.type = cardData.type; // 'number', 'action', 'wild'
    this.color = cardData.color; // 'red', 'yellow', 'green', 'blue', 'wild'
    this.value = cardData.value; // 数字或功能类型
    this.symbol = cardData.symbol; // 显示符号
    this.displayName = cardData.displayName; // 中文名称
  }

  /**
   * 获取UNO牌的完整信息
   * @returns {Object} UNO牌信息对象
   */
  getCardInfo() {
    return {
      type: this.type,
      color: this.color,
      value: this.value,
      symbol: this.symbol,
      displayName: this.displayName,
      isWild: this.color === 'wild'
    };
  }

  /**
   * 获取颜色配置
   * @returns {Object|null} 颜色配置对象
   */
  getColorConfig() {
    if (this.color === 'wild') {
      return null;
    }
    return Object.values(UNO_CONFIG.COLORS).find(c => c.name === this.color);
  }
}

/**
 * UNO牌工厂类
 */
class UnoCardFactory {
  /**
   * 创建数字牌数据
   * @param {string} color - 颜色名称
   * @param {number} number - 数字(0-9)
   * @returns {Object} 数字牌数据对象
   */
  static createNumberCardData(color, number) {
    const colorConfig = Object.values(UNO_CONFIG.COLORS).find(c => c.name === color);
    return {
      type: 'number',
      color: color,
      value: number,
      symbol: number.toString(),
      displayName: `${colorConfig.displayName}${number}`
    };
  }

  /**
   * 创建功能牌数据
   * @param {string} color - 颜色名称
   * @param {string} actionType - 功能类型
   * @returns {Object} 功能牌数据对象
   */
  static createActionCardData(color, actionType) {
    const colorConfig = Object.values(UNO_CONFIG.COLORS).find(c => c.name === color);
    const actionConfig = UNO_CONFIG.ACTION_TYPES[actionType.toUpperCase()];
    return {
      type: 'action',
      color: color,
      value: actionConfig.type,
      symbol: actionConfig.symbol,
      displayName: `${colorConfig.displayName}${actionConfig.displayName}`
    };
  }

  /**
   * 创建万能牌数据
   * @param {string} wildType - 万能牌类型
   * @returns {Object} 万能牌数据对象
   */
  static createWildCardData(wildType) {
    const wildConfig = UNO_CONFIG.WILD_TYPES[wildType.toUpperCase()];
    return {
      type: 'wild',
      color: 'wild',
      value: wildConfig.type,
      symbol: wildConfig.symbol,
      displayName: wildConfig.displayName
    };
  }

  /**
   * 获取所有可能的UNO牌数据
   * @returns {Array} 所有UNO牌数据数组
   */
  static getAllCards() {
    const cards = [];
    
    // 添加数字牌(每种颜色0-9)
    Object.values(UNO_CONFIG.COLORS).forEach(colorConfig => {
      UNO_CONFIG.NUMBER_CARDS.forEach(number => {
        cards.push(this.createNumberCardData(colorConfig.name, number));
      });
    });
    
    // 添加功能牌(每种颜色的跳过、反转、+2)
    Object.values(UNO_CONFIG.COLORS).forEach(colorConfig => {
      Object.keys(UNO_CONFIG.ACTION_TYPES).forEach(actionType => {
        cards.push(this.createActionCardData(colorConfig.name, actionType));
      });
    });
    
    // 添加万能牌(变色、+4)
    Object.keys(UNO_CONFIG.WILD_TYPES).forEach(wildType => {
      cards.push(this.createWildCardData(wildType));
    });
    
    return cards;
  }

  /**
   * 生成随机UNO牌数据
   * @param {Object} options - 配置选项
   * @param {boolean} options.includeWild - 是否包含万能牌,默认true
   * @returns {Object} 随机UNO牌数据对象
   */
  static getRandomCardData(options = {}) {
    const { includeWild = true } = options;
    
    let cards = this.getAllCards();
    
    // 如果不包含万能牌,过滤掉万能牌
    if (!includeWild) {
      cards = cards.filter(card => card.type !== 'wild');
    }
    
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
  }

  /**
   * 创建随机UNO牌实例
   * @param {Object} options - 配置选项
   * @returns {UnoCard} UNO牌实例
   */
  static createRandomCard(options = {}) {
    const cardData = this.getRandomCardData(options);
    return new UnoCard(cardData);
  }

  /**
   * 根据特定条件创建UNO牌
   * @param {string} color - 颜色
   * @param {string|number} value - 值(数字或功能类型)
   * @returns {UnoCard} UNO牌实例
   */
  static createCard(color, value) {
    let cardData;
    
    if (color === 'wild') {
      cardData = this.createWildCardData(value);
    } else if (typeof value === 'number') {
      cardData = this.createNumberCardData(color, value);
    } else {
      cardData = this.createActionCardData(color, value);
    }
    
    return new UnoCard(cardData);
  }
}

/**
 * DOM渲染器类
 */
class UnoCardRenderer {
  /**
   * 创建UNO牌DOM元素
   * @param {UnoCard} card - UNO牌实例
   * @param {Object} size - 尺寸配置 { width, height }
   * @returns {HTMLDivElement} UNO牌DOM元素
   */
  static createCardElement(card, size = {}) {
    const { width = UNO_CONFIG.DEFAULT_SIZE.width, height = UNO_CONFIG.DEFAULT_SIZE.height } = size;
    const cardInfo = card.getCardInfo();
    
    // 创建主容器
    const cardDiv = document.createElement('div');
    cardDiv.className = `uno-card uno-card--${cardInfo.color}`;
    cardDiv.style.width = `${width}px`;
    cardDiv.style.height = `${height}px`;
    
    // 设置数据属性
    cardDiv.dataset.type = cardInfo.type;
    cardDiv.dataset.color = cardInfo.color;
    cardDiv.dataset.value = cardInfo.value;
    
    // 创建内部结构
    if (cardInfo.isWild) {
      this.createWildCardContent(cardDiv, cardInfo);
    } else {
      this.createColoredCardContent(cardDiv, card, cardInfo);
    }
    
    return cardDiv;
  }

  /**
   * 创建彩色牌内容(数字牌和功能牌)
   * @param {HTMLDivElement} cardDiv - 卡牌容器
   * @param {UnoCard} card - UNO牌实例
   * @param {Object} cardInfo - 卡牌信息
   */
  static createColoredCardContent(cardDiv, card, cardInfo) {
    const colorConfig = card.getColorConfig();
    
    // 设置背景颜色
    cardDiv.style.backgroundColor = colorConfig.hex;
    
    // 创建白色椭圆背景
    const oval = document.createElement('div');
    oval.className = 'uno-card__oval';
    
    // 创建中心符号
    const symbol = document.createElement('div');
    symbol.className = 'uno-card__symbol';
    symbol.textContent = cardInfo.symbol;
    symbol.style.color = colorConfig.hex;
    
    // 创建左上角小符号
    const topCorner = document.createElement('div');
    topCorner.className = 'uno-card__corner uno-card__corner--top';
    topCorner.textContent = cardInfo.symbol;
    topCorner.style.color = colorConfig.textColor;
    
    // 创建右下角小符号
    const bottomCorner = document.createElement('div');
    bottomCorner.className = 'uno-card__corner uno-card__corner--bottom';
    bottomCorner.textContent = cardInfo.symbol;
    bottomCorner.style.color = colorConfig.textColor;
    
    // 组装DOM结构
    oval.appendChild(symbol);
    cardDiv.appendChild(topCorner);
    cardDiv.appendChild(oval);
    cardDiv.appendChild(bottomCorner);
  }

  /**
   * 创建万能牌内容
   * @param {HTMLDivElement} cardDiv - 卡牌容器
   * @param {Object} cardInfo - 卡牌信息
   */
  static createWildCardContent(cardDiv, cardInfo) {
    // 创建四色背景
    const quadrant1 = document.createElement('div');
    quadrant1.className = 'uno-card__quadrant uno-card__quadrant--1';
    
    const quadrant2 = document.createElement('div');
    quadrant2.className = 'uno-card__quadrant uno-card__quadrant--2';
    
    const quadrant3 = document.createElement('div');
    quadrant3.className = 'uno-card__quadrant uno-card__quadrant--3';
    
    const quadrant4 = document.createElement('div');
    quadrant4.className = 'uno-card__quadrant uno-card__quadrant--4';
    
    // 创建中心椭圆
    const oval = document.createElement('div');
    oval.className = 'uno-card__oval uno-card__oval--wild';
    
    // 创建符号
    const symbol = document.createElement('div');
    symbol.className = 'uno-card__symbol uno-card__symbol--wild';
    symbol.textContent = cardInfo.symbol;
    
    // 组装DOM结构
    oval.appendChild(symbol);
    cardDiv.appendChild(quadrant1);
    cardDiv.appendChild(quadrant2);
    cardDiv.appendChild(quadrant3);
    cardDiv.appendChild(quadrant4);
    cardDiv.appendChild(oval);
  }

  /**
   * 批量创建UNO牌DOM元素
   * @param {Array<UnoCard>} cards - UNO牌实例数组
   * @param {Object} size - 尺寸配置
   * @returns {Array<HTMLDivElement>} UNO牌DOM元素数组
   */
  static createCardElements(cards, size = {}) {
    return cards.map(card => this.createCardElement(card, size));
  }
}

/**
 * 主函数:生成随机UNO牌
 * @param {Object} options - 配置选项
 * @param {number} options.width - UNO牌宽度(px)
 * @param {number} options.height - UNO牌高度(px)
 * @param {boolean} options.includeWild - 是否包含万能牌,默认true
 * @returns {HTMLDivElement} UNO牌DOM元素
 */
function generateRandomUnoCard(options = {}) {
  try {
    // 参数验证
    const { width, height, includeWild = true } = options;
    
    if (width !== undefined && (typeof width !== 'number' || width <= 0)) {
      throw new Error('宽度必须是正数');
    }
    
    if (height !== undefined && (typeof height !== 'number' || height <= 0)) {
      throw new Error('高度必须是正数');
    }
    
    // 创建随机UNO牌
    const card = UnoCardFactory.createRandomCard({ includeWild });
    
    // 渲染DOM元素
    const cardElement = UnoCardRenderer.createCardElement(card, { width, height });
    
    return cardElement;
  } catch (error) {
    console.error('生成UNO牌失败:', error);
    throw error;
  }
}

/**
 * 根据颜色和值生成指定UNO牌
 * @param {string} color - 颜色('red', 'yellow', 'green', 'blue', 'wild')
 * @param {string|number} value - 值(数字0-9或功能类型)
 * @param {Object} options - 配置选项
 * @param {number} options.width - UNO牌宽度(px)
 * @param {number} options.height - UNO牌高度(px)
 * @returns {HTMLDivElement} UNO牌DOM元素
 */
function generateUnoCard(color, value, options = {}) {
  try {
    const { width, height } = options;
    
    // 创建指定UNO牌
    const card = UnoCardFactory.createCard(color, value);
    
    // 渲染DOM元素
    const cardElement = UnoCardRenderer.createCardElement(card, { width, height });
    
    return cardElement;
  } catch (error) {
    console.error('生成UNO牌失败:', error);
    throw error;
  }
}

// 导出模块(支持多种模块化方式)
if (typeof module !== 'undefined' && module.exports) {
  // CommonJS
  module.exports = {
    generateRandomUnoCard,
    generateUnoCard,
    UnoCard,
    UnoCardFactory,
    UnoCardRenderer,
    UNO_CONFIG
  };
} else if (typeof define === 'function' && define.amd) {
  // AMD
  define([], function() {
    return {
      generateRandomUnoCard,
      generateUnoCard,
      UnoCard,
      UnoCardFactory,
      UnoCardRenderer,
      UNO_CONFIG
    };
  });
} else {
  // 浏览器全局变量
  window.UnoCardModule = {
    generateRandomUnoCard,
    generateUnoCard,
    UnoCard,
    UnoCardFactory,
    UnoCardRenderer,
    UNO_CONFIG
  };
}
/** genAI_main_end */
