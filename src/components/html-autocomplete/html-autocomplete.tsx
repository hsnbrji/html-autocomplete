import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';


@Component({
  tag: 'html-autocomplete',
  styleUrls: {
    bootstrap: 'html-autocomplete.bootstrap.scss',
    material: 'html-autocomplete.material.scss',
  },
  shadow: true
})
export class HtmlAutocomplete implements ComponentInterface {

  private nativeInput?: HTMLInputElement;
  private suggestionElements?: HTMLLIElement[] = [];
  private ulElement?: HTMLUListElement;
  @State() hasFocus = false;
  @Element() el!: HTMLElement;

  /**
   * Suggestions
   */
  @Prop() suggestions: any[] = [];

  /**
   * The label field
   */
  @Prop() labelField: string = 'name';

  /**
   * The id field
   */
  @Prop() idField: string = 'id';

  /**
   * The placeholder
   */
  @Prop() placeholder: string;

  /**
   * ReadOnly attribute
   */
  @Prop() readonly = false;

  /**
   * The value of the input
   */
  @Prop() value;

  /**
   * The mode of the input
   */
  @Prop() mode: 'material' | 'bootstrap' = 'material';

  /**
   * The field that has the path of the image (image shows at the start of the item and can be an svg icon).
   * If this field is filled, the image will be visible
   */
  @Prop() imagePathField?: string;

  /**
   * The position determines where and how the label behaves.
   */
  @Prop() labelPosition?: 'fixed' | 'stacked' | 'floating' = 'floating';

  /**
   * The type of the input
   */
  readonly type: string = 'text';

  @State() filteredSuggestions: any[] = [];
  @Event() itemSelected: EventEmitter<any>;
  hoveredSuggestion: any;
  @State() hoveredIndex = 0;
  arrowKeyCodes = [38, 40, 13];

  connectedCallback() {
  }

  disconnectedCallback() {

  }

  /**
   * Sets focus on the specified `ion-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }

  private getValue(): string {
    return typeof this.value === 'number' ? this.value.toString() :
      (this.value || '').toString();
  }

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged() {
    // TODO: view suggestions
  }

  filter(value: string) {
    if (!value) {
      this.filteredSuggestions = [];
      return;
    }
    if (!this.suggestions) {
      return;
    }
    this.filteredSuggestions = this.suggestions.filter(suggestion =>
      suggestion[this.labelField].toLowerCase().indexOf(value.toLowerCase()) >= 0);
    const max = this.filteredSuggestions.length > 50 ? 50 : this.filteredSuggestions.length;
    if (this.filteredSuggestions && this.filteredSuggestions.length > 0) {
      this.filteredSuggestions = this.filteredSuggestions.slice(0, max);
      this.hoverSuggestion(0);
    } else {
      this.unHoverSuggestion()
    }
  }

  hideSuggestions() {
    setTimeout(() => {
      this.filteredSuggestions = [];
      this.unHoverSuggestion();
    }, 200);
  }

  handleFocus() {
    if (!this.readonly) {
      this.filter(this.value);
    }
  }

  keyUpCallbackHandler(event) {
    if (this.arrowKeyCodes.indexOf(event.which) === -1) {
      this.filter(this.value);
    } else if (this.filteredSuggestions && this.filteredSuggestions.length > 0) {
      if (event.which === 40) {// arrow down
        this.nativeInput.setSelectionRange(this.value.length, this.value.length);
        if (this.hoveredIndex === this.filteredSuggestions.length - 1) {
          this.hoveredIndex = 0;
        } else {
          this.hoveredIndex++;
        }
        this.hoverSuggestion(this.hoveredIndex);
      } else if (event.which === 38) {// arrow up
        this.nativeInput.setSelectionRange(this.value.length, this.value.length);
        if (this.hoveredIndex === 0) {
          this.hoveredIndex = this.filteredSuggestions.length - 1;
        } else {
          this.hoveredIndex--;
        }
        this.hoverSuggestion(this.hoveredIndex);
      } else {// enter
        event.preventDefault();
        event.stopImmediatePropagation();
        this.itemClickCallbackHandler(this.hoveredSuggestion);
      }
    } else {
      this.unHoverSuggestion()
    }

  }

  itemClickCallbackHandler(item: any) {
    this.value = item[this.labelField];
    this.filteredSuggestions = [];
    this.hoveredSuggestion = null;
    this.hoveredIndex = 0;
    this.itemSelected.emit(item);
    // this.propagateChange(item[this.idField]);
  }

  hoverSuggestion(index: number) {
    this.hoveredIndex = index;
    this.hoveredSuggestion = this.filteredSuggestions[this.hoveredIndex];
    // Ensures Suggestion is in the list scroll view
    if (this.ulElement) {
      const suggestionElement = this.suggestionElements[index];
      let cTop = this.ulElement.scrollTop;
      let cBottom = cTop + this.ulElement.clientHeight;

      //Determine element top and bottom
      let eTop = suggestionElement.offsetTop;
      let eBottom = eTop + suggestionElement.clientHeight;

      //Check if out of view
      if (eTop < cTop) {
        this.ulElement.scroll({top: this.ulElement.scrollTop - (cTop - eTop)})
      }
      else if (eBottom > cBottom) {
        this.ulElement.scroll({top: this.ulElement.scrollTop + (eBottom - cBottom)})
      }
    }
  }

  unHoverSuggestion() {
    this.hoveredIndex = -1;
    this.hoveredSuggestion = null;
  }


  // private hasValue(): boolean {
  //   return this.getValue().length > 0;
  // }

  // private getText(): string {
  //   return format(this.first, this.middle, this.last);
  // }

  private onInput = (ev) => {
    this.value = ev.target.value
  };

  render() {
    const value = this.getValue();
    const mode = this.mode;
    const input =
      <input
        name={'ac'}
        ref={input => this.nativeInput = input}
        placeholder={mode==='bootstrap'? this.placeholder : ''}
        readonly={this.readonly}
        type={this.type}
        value={value}
        onInput={this.onInput.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.hideSuggestions.bind(this)}
        onKeyUp={this.keyUpCallbackHandler.bind(this)}
      />;

    return (
      <Host
        class={{
          [mode]: true,
          'has-value': value.length > 0 || false,
          'item-hovered': this.hoveredIndex > -1
        }}
      >
        {mode === 'material' &&
        <div class="group">
          {input}
          <span class="highlight"></span><span class="bar"></span><label>{this.placeholder}</label>
        </div>
        }
        {mode === 'bootstrap' &&
        <div class={'group'}>
          <div class={'input-area'}>
            {input}
          </div>
        </div>
        }
        {(this.filteredSuggestions && this.filteredSuggestions.length > 0) &&
        <ul
          ref={ul => this.ulElement = ul}
          style={{
            position: 'absolute',
            width: `${this.nativeInput.offsetWidth}px`,
          }}>
          {this.filteredSuggestions.map((suggestion, index) =>
            <li
              ref={li => this.suggestionElements[index] = li}
              class={{
              'hovered': this.hoveredIndex === index
            }}
                onMouseEnter={this.hoverSuggestion.bind(this, index)}
                onClick={this.itemClickCallbackHandler.bind(this, suggestion)}
                value={suggestion[this.idField]}>
              {this.imagePathField && suggestion[this.imagePathField] &&
              <img src={suggestion[this.imagePathField]} alt="image"/>}
              {suggestion[this.labelField]}
            </li>
          )}
        </ul>
        }

      </Host>
    );
  }
}
