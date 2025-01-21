import {ILoaderConfig} from './AppLoaderModal';

interface Loaderistener {
  show: (config: ILoaderConfig) => void;
  hide: () => void;
}

class LoaderManager {
  private listeners: Loaderistener[] = [];
  static instance: LoaderManager | null = null;

  constructor() {
    if (!LoaderManager.instance) {
      LoaderManager.instance = this;
    }
    return LoaderManager.instance;
  }

  // Register a modal listener
  registerListener(listener: Loaderistener) {
    this.listeners.push(listener);
  }

  // Unregister a modal listener
  unregisterListener(listener: Loaderistener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  // Show modal
  show(config: ILoaderConfig) {
    this.listeners.forEach(listener => listener.show(config));
  }

  // Hide modal
  hide() {
    this.listeners.forEach(listener => listener.hide());
  }
}

const AppLoader = new LoaderManager();
export default AppLoader;
