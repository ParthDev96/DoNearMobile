import {IMediaOptionConfig} from './AppMediaOptions';

interface ModalListener {
  show: (config: IMediaOptionConfig) => void;
  hide: () => void;
}

class ModalManager {
  private listeners: ModalListener[] = [];
  static instance: ModalManager | null = null;

  constructor() {
    if (!ModalManager.instance) {
      ModalManager.instance = this;
    }
    return ModalManager.instance;
  }

  // Register a modal listener
  registerListener(listener: ModalListener) {
    this.listeners.push(listener);
  }

  // Unregister a modal listener
  unregisterListener(listener: ModalListener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  // Show modal
  show(config: IMediaOptionConfig) {
    this.listeners.forEach(listener => listener.show(config));
  }

  // Hide modal
  hide() {
    this.listeners.forEach(listener => listener.hide());
  }
}

const AppMediaOptions = new ModalManager();
export default AppMediaOptions;
