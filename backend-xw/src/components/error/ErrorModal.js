import { Modal} from "antd";


export  function errorModal(err) {
      let secondsToGo = 4;
      const modal = Modal.error({
        title: '错误',
        content: `${err}`,
      });
      const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `This modal will be destroyed after ${secondsToGo} second.`,
        });
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
      }, secondsToGo * 1000);
    }
    


