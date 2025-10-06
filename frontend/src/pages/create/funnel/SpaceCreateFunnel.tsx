import StepProgressBar from '../../../components/@common/progressBar/step/StepProgressBar';
import useConfirmBeforeRefresh from '../../../hooks/@common/useConfirmBeforeRefresh';
import useFormFunnel from '../../../hooks/domain/funnel/useFormFunnel';
import type { CreateFunnelForm } from '../../../types/funnel.type';
import AccessTypeElement from '../funnelElements/accessTypeElement/AccessTypeElement';
import NameInputElement from '../funnelElements/NameInputElement';
import * as S from './SpaceCreateFunnel.styles';

type Step = 'name' | 'description' | 'check' | 'accessType';
const PROGRESS_STEP_LIST: readonly Step[] = [
  'name',
  'description',
  'accessType',
  'check',
] as const;
const initialCreateFunnelForm: CreateFunnelForm = {
  name: '',
  description: '',
  accessType: 'PUBLIC',
};

const SpaceCreateFunnel = () => {
  useConfirmBeforeRefresh();

  const Funnel = useFormFunnel<Step, CreateFunnelForm>(
    'name',
    initialCreateFunnelForm,
  );
  const currentStepIndex = PROGRESS_STEP_LIST.indexOf(Funnel.funnelStep) + 1;

  return (
    <S.Wrapper>
      <StepProgressBar
        currentStep={currentStepIndex}
        maxStep={PROGRESS_STEP_LIST.length}
      />
      <S.TopContainer></S.TopContainer>
      <S.ContentContainer>
        <Funnel.Step name="name">
          <NameInputElement
            onNext={(name) => Funnel.goNextWithData('description', { name })}
            initialValue={Funnel.form.name}
          />
        </Funnel.Step>
        <Funnel.Step name="description">
          <NameInputElement
            onNext={(description) =>
              Funnel.goNextWithData('accessType', { description })
            }
            initialValue={Funnel.form.description}
          />
        </Funnel.Step>
        <Funnel.Step name="accessType">
          <AccessTypeElement
            onNext={(accessType) =>
              Funnel.goNextWithData('check', { accessType })
            }
            initialValue={Funnel.form.accessType}
          />
        </Funnel.Step>
        <Funnel.Step name="check">
          <p>{Funnel.form.name}</p>
          <p>{Funnel.form.description}</p>
        </Funnel.Step>
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default SpaceCreateFunnel;
