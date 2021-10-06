import React, { useState } from 'react';
import { useAppSelector } from "../../store/hooks";
import { InputGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

type ScrollingToggleProps = {
  toggleScrolling: () => void
}

const ScrollingToggle = (props: ScrollingToggleProps) => {
    const enableScrolling = useAppSelector(state => state.game.enableScrolling);
    const [scrolling, setScrolling] = useState('false');
  
    const radios = [
      { name: 'Enabled', value: 'true' },
      { name: 'Disabled', value: 'false' },
    ];
  
    return (
      <>
        <ToggleButtonGroup type="radio" defaultValue={enableScrolling} name="name" className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text>In-game scrolling:</InputGroup.Text>
            </InputGroup.Prepend>
            {radios.map((radio, idx) => (
                <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                name="radio"
                value={radio.value}
                checked={scrolling === radio.value}
                onChange={(e) => {
                    setScrolling(e.currentTarget.value);
                    props.toggleScrolling();
                }}
                >
                {radio.name}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
      </>
    );
  }


export default ScrollingToggle;
