
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
// import AiOutlineTeam from 'react-icons/ai';
import Zoom from 'react-reveal/Zoom';

const TeamSection = () => {
  const { t } = useTranslation();

  return (
    <section id="team" className="py-5 bg-light">
      <Container>
        <Row>
          <Col>
            <Zoom>
              <h2 className="text-center">{t('team.title')}</h2>
              <p>{t('team.description')}</p>
            </Zoom>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TeamSection;
