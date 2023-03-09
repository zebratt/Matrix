import { SylApi, SylController, SylPlugin } from '@syllepsis/adapter';
import { ArrowsAltOutlined } from '@ant-design/icons';

const PLUGIN_NAME = 'fullscreen';
const EVENT_NAME = 'event_fullscreen';

class FullscreenController extends SylController {
  public name = PLUGIN_NAME;

  public toolbar = {
    className: PLUGIN_NAME,
    tooltip: PLUGIN_NAME,
    icon: () => {
      return <ArrowsAltOutlined width={26} height={26} style={{ verticalAlign: -7 }} />;
    },
    handler: (editor: SylApi) => {
      editor.emit(EVENT_NAME);
    },
  };
}

class FullscreenPlugin extends SylPlugin {
  public name = PLUGIN_NAME;
  public static eventName = EVENT_NAME;
  public Controller = FullscreenController;
}

export { FullscreenPlugin };
