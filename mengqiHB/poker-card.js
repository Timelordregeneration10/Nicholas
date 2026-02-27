/** genAI_main_start */
/**
 * 扑克牌生成器模块
 * 提供随机生成扑克牌的功能
 */

// 扑克牌常量配置
const POKER_CONFIG = {
  // 花色配置
  SUITS: {
    SPADE: { name: 'spade', symbol: '♠', color: 'black', displayName: '黑桃' },
    HEART: { name: 'heart', symbol: '♥', color: 'red', displayName: '红桃' },
    DIAMOND: { name: 'diamond', symbol: '♦', color: 'red', displayName: '方块' },
    CLUB: { name: 'club', symbol: '♣', color: 'black', displayName: '梅花' }
  },
  
  // 点数配置
  RANKS: {
    ACE: { value: 1, display: 'A', name: 'ace' },
    TWO: { value: 2, display: '2', name: 'two' },
    THREE: { value: 3, display: '3', name: 'three' },
    FOUR: { value: 4, display: '4', name: 'four' },
    FIVE: { value: 5, display: '5', name: 'five' },
    SIX: { value: 6, display: '6', name: 'six' },
    SEVEN: { value: 7, display: '7', name: 'seven' },
    EIGHT: { value: 8, display: '8', name: 'eight' },
    NINE: { value: 9, display: '9', name: 'nine' },
    TEN: { value: 10, display: '10', name: 'ten' },
    JACK: { value: 11, display: 'J', name: 'jack' },
    QUEEN: { value: 12, display: 'Q', name: 'queen' },
    KING: { value: 13, display: 'K', name: 'king' }
  },
  
  // 默认尺寸
  DEFAULT_SIZE: {
    width: 100,
    height: 140
  }
};

/**
 * 扑克牌类
 */
class PokerCard {
  /**
   * 构造函数
   * @param {Object} suit - 花色对象
   * @param {Object} rank - 点数对象
   */
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  /**
   * 获取扑克牌的完整信息
   * @returns {Object} 扑克牌信息对象
   */
  getCardInfo() {
    return {
      suit: this.suit,
      rank: this.rank,
      color: this.suit.color,
      displayText: `${this.rank.display}${this.suit.symbol}`
    };
  }
}

/**
 * 扑克牌工厂类
 */
class PokerCardFactory {
  /**
   * 获取所有花色数组
   * @returns {Array} 花色数组
   */
  static getAllSuits() {
    return Object.values(POKER_CONFIG.SUITS);
  }

  /**
   * 获取所有点数数组
   * @returns {Array} 点数数组
   */
  static getAllRanks() {
    return Object.values(POKER_CONFIG.RANKS);
  }

  /**
   * 生成随机花色
   * @returns {Object} 随机花色对象
   */
  static getRandomSuit() {
    const suits = this.getAllSuits();
    const randomIndex = Math.floor(Math.random() * suits.length);
    return suits[randomIndex];
  }

  /**
   * 生成随机点数
   * @returns {Object} 随机点数对象
   */
  static getRandomRank() {
    const ranks = this.getAllRanks();
    const randomIndex = Math.floor(Math.random() * ranks.length);
    return ranks[randomIndex];
  }

  /**
   * 创建随机扑克牌
   * @returns {PokerCard} 扑克牌实例
   */
  static createRandomCard() {
    const suit = this.getRandomSuit();
    const rank = this.getRandomRank();
    return new PokerCard(suit, rank);
  }
}

/**
 * DOM渲染器类
 */
class PokerCardRenderer {
  /**
   * 创建扑克牌DOM元素
   * @param {PokerCard} card - 扑克牌实例
   * @param {Object} size - 尺寸配置 { width, height }
   * @returns {HTMLDivElement} 扑克牌DOM元素
   */
  static createCardElement(card, size = {}) {
    const { width = POKER_CONFIG.DEFAULT_SIZE.width, height = POKER_CONFIG.DEFAULT_SIZE.height } = size;
    const cardInfo = card.getCardInfo();
    
    // 创建主容器
    const cardDiv = document.createElement('div');
    cardDiv.className = `poker-card poker-card--${cardInfo.color}`;
    cardDiv.style.width = `${width}px`;
    cardDiv.style.height = `${height}px`;
    
    // 设置数据属性
    cardDiv.dataset.suit = cardInfo.suit.name;
    cardDiv.dataset.rank = cardInfo.rank.name;
    cardDiv.dataset.value = cardInfo.rank.value;
    
    // 创建顶部角标
    const topCorner = this.createCorner(cardInfo, 'top');
    
    // 创建中间花色符号
    const centerSymbol = this.createCenterSymbol(cardInfo);
    
    // 创建底部角标
    const bottomCorner = this.createCorner(cardInfo, 'bottom');
    
    // 组装DOM结构
    cardDiv.appendChild(topCorner);
    cardDiv.appendChild(centerSymbol);
    cardDiv.appendChild(bottomCorner);
    
    return cardDiv;
  }

  /**
   * 创建角标元素
   * @param {Object} cardInfo - 扑克牌信息
   * @param {string} position - 位置 'top' 或 'bottom'
   * @returns {HTMLDivElement} 角标DOM元素
   */
  static createCorner(cardInfo, position) {
    const corner = document.createElement('div');
    corner.className = `poker-card__corner poker-card__corner--${position}`;
    
    const rank = document.createElement('div');
    rank.className = 'poker-card__rank';
    rank.textContent = cardInfo.rank.display;
    
    const suit = document.createElement('div');
    suit.className = 'poker-card__suit';
    suit.textContent = cardInfo.suit.symbol;
    
    corner.appendChild(rank);
    corner.appendChild(suit);
    
    return corner;
  }

  /**
   * 创建中间花色符号
   * @param {Object} cardInfo - 扑克牌信息
   * @returns {HTMLDivElement} 中间符号DOM元素
   */
  static createCenterSymbol(cardInfo) {
    const center = document.createElement('div');
    center.className = 'poker-card__center';
    
    const symbol = document.createElement('div');
    symbol.className = 'poker-card__symbol';
    symbol.textContent = cardInfo.suit.symbol;
    
    center.appendChild(symbol);
    
    return center;
  }
}

/**
 * 主函数:生成随机扑克牌
 * @param {Object} options - 配置选项
 * @param {number} options.width - 扑克牌宽度(px)
 * @param {number} options.height - 扑克牌高度(px)
 * @returns {HTMLDivElement} 扑克牌DOM元素
 */
function generateRandomPokerCard(options = {}) {
  try {
    // 参数验证
    const { width, height } = options;
    
    if (width !== undefined && (typeof width !== 'number' || width <= 0)) {
      throw new Error('宽度必须是正数');
    }
    
    if (height !== undefined && (typeof height !== 'number' || height <= 0)) {
      throw new Error('高度必须是正数');
    }
    
    // 创建随机扑克牌
    const card = PokerCardFactory.createRandomCard();
    
    // 渲染DOM元素
    const cardElement = PokerCardRenderer.createCardElement(card, { width, height });
    
    return cardElement;
  } catch (error) {
    console.error('生成扑克牌失败:', error);
    throw error;
  }
}

// 导出模块(支持多种模块化方式)
if (typeof module !== 'undefined' && module.exports) {
  // CommonJS
  module.exports = {
    generateRandomPokerCard,
    PokerCard,
    PokerCardFactory,
    PokerCardRenderer,
    POKER_CONFIG
  };
} else if (typeof define === 'function' && define.amd) {
  // AMD
  define([], function() {
    return {
      generateRandomPokerCard,
      PokerCard,
      PokerCardFactory,
      PokerCardRenderer,
      POKER_CONFIG
    };
  });
} else {
  // 浏览器全局变量
  window.PokerCardModule = {
    generateRandomPokerCard,
    PokerCard,
    PokerCardFactory,
    PokerCardRenderer,
    POKER_CONFIG
  };
}
/** genAI_main_end */
