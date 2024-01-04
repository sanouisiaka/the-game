import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getPastFixtures, retrievePastFixturesThunk } from '@/corelogic/store/fixtures/fixtures.store';
import FixtureInfo from '@/components/elements/fixtureInfo';
import { Carousel } from 'flowbite-react';

export default function LastFixtures() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(retrievePastFixturesThunk());
  }, [dispatch]);

  const pastFixture = useAppSelector(getPastFixtures);

  const fixturesList = pastFixture.map(fixture =>
    <div key={fixture.id} className='my-2- h-full' ><FixtureInfo id={fixture.id} /></div>,
  );

  return (
    <Carousel slideInterval={10000} pauseOnHover indicators={false} leftControl={<span/>} rightControl={<span/>}>
      {fixturesList}
    </Carousel>
  );
}