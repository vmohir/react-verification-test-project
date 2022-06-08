import './StatusScreen.scss';
import Button from './Button';

export default function StatusScreen({
  isSuccess,
  onTryAgain,
}: {
  isSuccess: boolean;
  onTryAgain: () => void;
}) {
  return (
    <div className={'container ' + (isSuccess ? 'success' : 'danger')}>
      <div className="submit-screen">
        <div className="font-size-3">{isSuccess ? '✔' : '✘'}</div>
        <div className="mb-2 font-size-2">{isSuccess ? 'Success' : 'Error'}</div>
        <div className="mb-3">
          {isSuccess ? 'Successfully submitted' : 'Error in fetching data'}
        </div>
        {!isSuccess && (
          <Button type="button" onClick={onTryAgain}>
            Try again
          </Button>
        )}
      </div>
    </div>
  );
}
