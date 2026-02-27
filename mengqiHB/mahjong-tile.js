/** genAI_main_start */
/**
 * 麻将牌生成器模块
 * 提供随机生成麻将牌的功能
 */

// 麻将牌常量配置
const MAHJONG_CONFIG = {
  // 图片路径配置
  IMAGE_BASE_PATH: 'img/majiang/',
  
  // 万子配置 (Characters/Man)
  CHARACTERS: [
    { id: '1m', name: '一万', type: 'character', value: 1, filename: '1m.svg' },
    { id: '2m', name: '二万', type: 'character', value: 2, filename: '2m.svg' },
    { id: '3m', name: '三万', type: 'character', value: 3, filename: '3m.svg' },
    { id: '4m', name: '四万', type: 'character', value: 4, filename: '4m.svg' },
    { id: '5m', name: '五万', type: 'character', value: 5, filename: '5m.svg' },
    { id: '0m', name: '红五万', type: 'character', value: 5, filename: '0m.svg', isRed: true },
    { id: '6m', name: '六万', type: 'character', value: 6, filename: '6m.svg' },
    { id: '7m', name: '七万', type: 'character', value: 7, filename: '7m.svg' },
    { id: '8m', name: '八万', type: 'character', value: 8, filename: '8m.svg' },
    { id: '9m', name: '九万', type: 'character', value: 9, filename: '9m.svg' }
  ],
  
  // 筒子配置 (Dots/Pin)
  DOTS: [
    { id: '1p', name: '一筒', type: 'dot', value: 1, filename: '1p.svg' },
    { id: '2p', name: '二筒', type: 'dot', value: 2, filename: '2p.svg' },
    { id: '3p', name: '三筒', type: 'dot', value: 3, filename: '3p.svg' },
    { id: '4p', name: '四筒', type: 'dot', value: 4, filename: '4p.svg' },
    { id: '5p', name: '五筒', type: 'dot', value: 5, filename: '5p.svg' },
    { id: '0p', name: '红五筒', type: 'dot', value: 5, filename: '0p.svg', isRed: true },
    { id: '6p', name: '六筒', type: 'dot', value: 6, filename: '6p.svg' },
    { id: '7p', name: '七筒', type: 'dot', value: 7, filename: '7p.svg' },
    { id: '8p', name: '八筒', type: 'dot', value: 8, filename: '8p.svg' },
    { id: '9p', name: '九筒', type: 'dot', value: 9, filename: '9p.svg' }
  ],
  
  // 索子配置 (Bamboos/Sou)
  BAMBOOS: [
    { id: '1s', name: '一索', type: 'bamboo', value: 1, filename: '1s.svg' },
    { id: '2s', name: '二索', type: 'bamboo', value: 2, filename: '2s.svg' },
    { id: '3s', name: '三索', type: 'bamboo', value: 3, filename: '3s.svg' },
    { id: '4s', name: '四索', type: 'bamboo', value: 4, filename: '4s.svg' },
    { id: '5s', name: '五索', type: 'bamboo', value: 5, filename: '5s.svg' },
    { id: '0s', name: '红五索', type: 'bamboo', value: 5, filename: '0s.svg', isRed: true },
    { id: '6s', name: '六索', type: 'bamboo', value: 6, filename: '6s.svg' },
    { id: '7s', name: '七索', type: 'bamboo', value: 7, filename: '7s.svg' },
    { id: '8s', name: '八索', type: 'bamboo', value: 8, filename: '8s.svg' },
    { id: '9s', name: '九索', type: 'bamboo', value: 9, filename: '9s.svg' }
  ],
  
  // 字牌配置 (Honors/Zi)
  HONORS: [
    { id: '1z', name: '东', type: 'honor', subtype: 'wind', filename: '1z.svg' },
    { id: '2z', name: '南', type: 'honor', subtype: 'wind', filename: '2z.svg' },
    { id: '3z', name: '西', type: 'honor', subtype: 'wind', filename: '3z.svg' },
    { id: '4z', name: '北', type: 'honor', subtype: 'wind', filename: '4z.svg' },
    { id: '5z', name: '白', type: 'honor', subtype: 'dragon', filename: '5z.svg' },
    { id: '6z', name: '发', type: 'honor', subtype: 'dragon', filename: '6z.svg' },
    { id: '7z', name: '中', type: 'honor', subtype: 'dragon', filename: '7z.svg' }
  ],
  
  // 花牌配置 (Bonus tiles)
  FLOWERS: [
    { id: 'chun', name: '春', type: 'flower', subtype: 'season', filename: 'chun.svg' },
    { id: 'xia', name: '夏', type: 'flower', subtype: 'season', filename: 'xia.svg' },
    { id: 'qiu', name: '秋', type: 'flower', subtype: 'season', filename: 'qiu.svg' },
    { id: 'dong', name: '冬', type: 'flower', subtype: 'season', filename: 'dong.svg' },
    { id: 'mei', name: '梅', type: 'flower', subtype: 'plant', filename: 'mei.svg' },
    { id: 'lan', name: '兰', type: 'flower', subtype: 'plant', filename: 'lan.svg' },
    { id: 'ju', name: '菊', type: 'flower', subtype: 'plant', filename: 'ju.svg' },
    { id: 'zu', name: '竹', type: 'flower', subtype: 'plant', filename: 'zu.svg' }
  ],
  
  // 默认尺寸
  DEFAULT_SIZE: {
    width: 60,
    height: 80
  }
};

/**
 * 麻将牌类
 */
class MahjongTile {
  /**
   * 构造函数
   * @param {Object} tileData - 麻将牌数据对象
   */
  constructor(tileData) {
    this.id = tileData.id;
    this.name = tileData.name;
    this.type = tileData.type;
    this.subtype = tileData.subtype || null;
    this.value = tileData.value || null;
    this.filename = tileData.filename;
    this.isRed = tileData.isRed || false;
  }

  /**
   * 获取麻将牌的完整信息
   * @returns {Object} 麻将牌信息对象
   */
  getTileInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      subtype: this.subtype,
      value: this.value,
      filename: this.filename,
      isRed: this.isRed,
      imagePath: MAHJONG_CONFIG.IMAGE_BASE_PATH + this.filename
    };
  }

  /**
   * 获取麻将牌类型的中文名称
   * @returns {string} 类型中文名称
   */
  getTypeDisplayName() {
    const typeMap = {
      character: '万子',
      dot: '筒子',
      bamboo: '索子',
      honor: '字牌',
      flower: '花牌'
    };
    return typeMap[this.type] || '未知';
  }
}

/**
 * 麻将牌工厂类
 */
class MahjongTileFactory {
  /**
   * 获取所有麻将牌数据
   * @param {boolean} includeFlowers - 是否包含花牌,默认true
   * @returns {Array} 所有麻将牌数据数组
   */
  static getAllTiles(includeFlowers = true) {
    const tiles = [
      ...MAHJONG_CONFIG.CHARACTERS,
      ...MAHJONG_CONFIG.DOTS,
      ...MAHJONG_CONFIG.BAMBOOS,
      ...MAHJONG_CONFIG.HONORS
    ];
    
    if (includeFlowers) {
      tiles.push(...MAHJONG_CONFIG.FLOWERS);
    }
    
    return tiles;
  }

  /**
   * 根据类型获取麻将牌数据
   * @param {string} type - 类型: 'character', 'dot', 'bamboo', 'honor', 'flower'
   * @returns {Array} 指定类型的麻将牌数据数组
   */
  static getTilesByType(type) {
    const typeMap = {
      character: MAHJONG_CONFIG.CHARACTERS,
      dot: MAHJONG_CONFIG.DOTS,
      bamboo: MAHJONG_CONFIG.BAMBOOS,
      honor: MAHJONG_CONFIG.HONORS,
      flower: MAHJONG_CONFIG.FLOWERS
    };
    
    return typeMap[type] || [];
  }

  /**
   * 根据ID获取麻将牌数据
   * @param {string} id - 麻将牌ID
   * @returns {Object|null} 麻将牌数据对象或null
   */
  static getTileById(id) {
    const allTiles = this.getAllTiles(true);
    return allTiles.find(tile => tile.id === id) || null;
  }

  /**
   * 生成随机麻将牌数据
   * @param {Object} options - 配置选项
   * @param {boolean} options.includeFlowers - 是否包含花牌,默认true
   * @param {boolean} options.includeRedFives - 是否包含红五,默认true
   * @returns {Object} 随机麻将牌数据对象
   */
  static getRandomTileData(options = {}) {
    const { includeFlowers = true, includeRedFives = true } = options;
    
    let tiles = this.getAllTiles(includeFlowers);
    
    // 如果不包含红五,过滤掉红五牌
    if (!includeRedFives) {
      tiles = tiles.filter(tile => !tile.isRed);
    }
    
    const randomIndex = Math.floor(Math.random() * tiles.length);
    return tiles[randomIndex];
  }

  /**
   * 创建随机麻将牌实例
   * @param {Object} options - 配置选项
   * @returns {MahjongTile} 麻将牌实例
   */
  static createRandomTile(options = {}) {
    const tileData = this.getRandomTileData(options);
    return new MahjongTile(tileData);
  }

  /**
   * 根据ID创建麻将牌实例
   * @param {string} id - 麻将牌ID
   * @returns {MahjongTile|null} 麻将牌实例或null
   */
  static createTileById(id) {
    const tileData = this.getTileById(id);
    return tileData ? new MahjongTile(tileData) : null;
  }
}

/**
 * DOM渲染器类
 */
class MahjongTileRenderer {
  /**
   * 创建麻将牌DOM元素
   * @param {MahjongTile} tile - 麻将牌实例
   * @param {Object} size - 尺寸配置 { width, height }
   * @returns {HTMLDivElement} 麻将牌DOM元素
   */
  static createTileElement(tile, size = {}) {
    const { width = MAHJONG_CONFIG.DEFAULT_SIZE.width, height = MAHJONG_CONFIG.DEFAULT_SIZE.height } = size;
    const tileInfo = tile.getTileInfo();
    
    // 创建主容器
    const tileDiv = document.createElement('div');
    tileDiv.className = `mahjong-tile mahjong-tile--${tileInfo.type}`;
    
    // 添加红五特殊样式
    if (tileInfo.isRed) {
      tileDiv.classList.add('mahjong-tile--red');
    }
    
    tileDiv.style.width = `${width}px`;
    tileDiv.style.height = `${height}px`;
    
    // 设置数据属性
    tileDiv.dataset.id = tileInfo.id;
    tileDiv.dataset.name = tileInfo.name;
    tileDiv.dataset.type = tileInfo.type;
    if (tileInfo.subtype) {
      tileDiv.dataset.subtype = tileInfo.subtype;
    }
    if (tileInfo.value !== null) {
      tileDiv.dataset.value = tileInfo.value;
    }
    
    // 创建内部容器
    const innerDiv = document.createElement('div');
    innerDiv.className = 'mahjong-tile__inner';
    
    // 创建图片元素
    const img = document.createElement('img');
    img.className = 'mahjong-tile__image';
    img.src = tileInfo.imagePath;
    img.alt = tileInfo.name;
    img.draggable = false;
    
    // 图片加载错误处理
    img.onerror = () => {
      console.error(`麻将牌图片加载失败: ${tileInfo.imagePath}`);
      img.style.display = 'none';
      
      // 显示文字备用方案
      const fallbackText = document.createElement('div');
      fallbackText.className = 'mahjong-tile__fallback';
      fallbackText.textContent = tileInfo.name;
      innerDiv.appendChild(fallbackText);
    };
    
    // 组装DOM结构
    innerDiv.appendChild(img);
    tileDiv.appendChild(innerDiv);
    
    return tileDiv;
  }

  /**
   * 批量创建麻将牌DOM元素
   * @param {Array<MahjongTile>} tiles - 麻将牌实例数组
   * @param {Object} size - 尺寸配置
   * @returns {Array<HTMLDivElement>} 麻将牌DOM元素数组
   */
  static createTileElements(tiles, size = {}) {
    return tiles.map(tile => this.createTileElement(tile, size));
  }
}

/**
 * 主函数:生成随机麻将牌
 * @param {Object} options - 配置选项
 * @param {number} options.width - 麻将牌宽度(px)
 * @param {number} options.height - 麻将牌高度(px)
 * @param {boolean} options.includeFlowers - 是否包含花牌,默认true
 * @param {boolean} options.includeRedFives - 是否包含红五,默认true
 * @returns {HTMLDivElement} 麻将牌DOM元素
 */
function generateRandomMahjongTile(options = {}) {
  try {
    // 参数验证
    const { width, height, includeFlowers = true, includeRedFives = true } = options;
    
    if (width !== undefined && (typeof width !== 'number' || width <= 0)) {
      throw new Error('宽度必须是正数');
    }
    
    if (height !== undefined && (typeof height !== 'number' || height <= 0)) {
      throw new Error('高度必须是正数');
    }
    
    // 创建随机麻将牌
    const tile = MahjongTileFactory.createRandomTile({ includeFlowers, includeRedFives });
    
    // 渲染DOM元素
    const tileElement = MahjongTileRenderer.createTileElement(tile, { width, height });
    
    return tileElement;
  } catch (error) {
    console.error('生成麻将牌失败:', error);
    throw error;
  }
}

/**
 * 根据ID生成指定麻将牌
 * @param {string} id - 麻将牌ID
 * @param {Object} options - 配置选项
 * @param {number} options.width - 麻将牌宽度(px)
 * @param {number} options.height - 麻将牌高度(px)
 * @returns {HTMLDivElement|null} 麻将牌DOM元素或null
 */
function generateMahjongTileById(id, options = {}) {
  try {
    const { width, height } = options;
    
    // 创建指定ID的麻将牌
    const tile = MahjongTileFactory.createTileById(id);
    
    if (!tile) {
      console.warn(`未找到ID为 ${id} 的麻将牌`);
      return null;
    }
    
    // 渲染DOM元素
    const tileElement = MahjongTileRenderer.createTileElement(tile, { width, height });
    
    return tileElement;
  } catch (error) {
    console.error('生成麻将牌失败:', error);
    throw error;
  }
}

// 导出模块(支持多种模块化方式)
if (typeof module !== 'undefined' && module.exports) {
  // CommonJS
  module.exports = {
    generateRandomMahjongTile,
    generateMahjongTileById,
    MahjongTile,
    MahjongTileFactory,
    MahjongTileRenderer,
    MAHJONG_CONFIG
  };
} else if (typeof define === 'function' && define.amd) {
  // AMD
  define([], function() {
    return {
      generateRandomMahjongTile,
      generateMahjongTileById,
      MahjongTile,
      MahjongTileFactory,
      MahjongTileRenderer,
      MAHJONG_CONFIG
    };
  });
} else {
  // 浏览器全局变量
  window.MahjongTileModule = {
    generateRandomMahjongTile,
    generateMahjongTileById,
    MahjongTile,
    MahjongTileFactory,
    MahjongTileRenderer,
    MAHJONG_CONFIG
  };
}
/** genAI_main_end */
