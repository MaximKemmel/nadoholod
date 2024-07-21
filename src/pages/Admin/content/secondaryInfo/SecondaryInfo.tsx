import { useEffect, useState } from "react";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSeletor";

import pageStyles from "../../Admin.module.sass";

import MessageModal from "../../../../components/Modal/MessageModal";

import { ServerStatusType } from "../../../../enums/serverStatusType";
import { initServerStatus } from "../../../../types/main/serverStatus";

const SecondaryInfo = () => {
  const { updateSecondaryInfo, getSecondaryInfo, setUpdateSecondaryInfoStatus } = useActions();
  const [secondaryInfo, setSecondaryInfo] = useState(useTypedSelector((state) => state.secondaryInfoReducer.secondaryInfo));
  const updateStatus = useTypedSelector((state) => state.secondaryInfoReducer.updateSecondaryInfoStatus);
  const [isCheckFields, setIsCheckFields] = useState(false);
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [titleMessage, setTitleMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    if (updateStatus.status === ServerStatusType.Success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getSecondaryInfo();
      setTitleMessage("Успех!");
      setInfoMessage("Информация обновлена");
      setIsMessageShow(true);
      setUpdateSecondaryInfoStatus(initServerStatus());
    }
    if (updateStatus.status === ServerStatusType.Error) {
      setTitleMessage("Ошибка");
      setInfoMessage("Ошибка при обновлении информации");
      setIsMessageShow(true);
      setUpdateSecondaryInfoStatus(initServerStatus());
    }
  }, [updateStatus]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!isCheckFields) {
      setIsCheckFields(true);
    }
    if (secondaryInfo.chillers_count > 0 && secondaryInfo.cameras_count > 0 && secondaryInfo.generators_count > 0) {
      updateSecondaryInfo({ secondaryInfo: secondaryInfo });
    } else {
      setTitleMessage("Внимание");
      setInfoMessage("Не все поля заполнены");
      setIsMessageShow(true);
    }
  };

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.head}>
        <div className={pageStyles.title}>Другая информация</div>
      </div>
      <div className={pageStyles.content}>
        <form className={pageStyles.form} onSubmit={handleOnSubmit}>
          <div className={pageStyles.row}>
            <div className={pageStyles.fields}>
              <div className={pageStyles.input_field}>
                <div className={pageStyles.label}>Количество холодильных камер</div>
                <input
                  className={secondaryInfo.cameras_count === 0 && isCheckFields ? pageStyles.wrong : ""}
                  type="text"
                  placeholder="Количество холодильных камер"
                  value={secondaryInfo.cameras_count}
                  onChange={(event) =>
                    setSecondaryInfo({
                      ...secondaryInfo,
                      cameras_count: Number.isNaN(Number(event.target.value)) ? 0 : Number(event.target.value),
                    })
                  }
                />
              </div>
              <div className={pageStyles.input_field}>
                <div className={pageStyles.label}>Количество чиллеров</div>
                <input
                  className={secondaryInfo.chillers_count === 0 && isCheckFields ? pageStyles.wrong : ""}
                  type="text"
                  placeholder="Количество чиллеров"
                  value={secondaryInfo.chillers_count}
                  onChange={(event) =>
                    setSecondaryInfo({
                      ...secondaryInfo,
                      chillers_count: Number.isNaN(Number(event.target.value)) ? 0 : Number(event.target.value),
                    })
                  }
                />
              </div>
              <div className={pageStyles.input_field}>
                <div className={pageStyles.label}>Количество генераторов ледяной воды</div>
                <input
                  className={secondaryInfo.generators_count === 0 && isCheckFields ? pageStyles.wrong : ""}
                  type="text"
                  placeholder="Количество генераторов ледяной воды"
                  value={secondaryInfo.generators_count}
                  onChange={(event) =>
                    setSecondaryInfo({
                      ...secondaryInfo,
                      generators_count: Number.isNaN(Number(event.target.value)) ? 0 : Number(event.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
          <button type="submit">Сохранить</button>
        </form>
      </div>
      <MessageModal isShow={isMessageShow} setIsShow={setIsMessageShow} title={titleMessage} message={infoMessage} />
    </div>
  );
};

export default SecondaryInfo;
