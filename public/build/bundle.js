
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.1' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\components\preload.svelte generated by Svelte v3.44.1 */
    const file$5 = "src\\components\\preload.svelte";

    function create_fragment$9(ctx) {
    	let div7;
    	let div6;
    	let div5;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let t2;
    	let div3;
    	let t3;
    	let div4;

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			div6 = element("div");
    			div5 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			t1 = space();
    			div2 = element("div");
    			t2 = space();
    			div3 = element("div");
    			t3 = space();
    			div4 = element("div");
    			attr_dev(div0, "class", "circle-line");
    			add_location(div0, file$5, 13, 6, 445);
    			attr_dev(div1, "class", "circle-line");
    			add_location(div1, file$5, 14, 6, 480);
    			attr_dev(div2, "class", "circle-line");
    			add_location(div2, file$5, 15, 6, 515);
    			attr_dev(div3, "class", "circle-line");
    			add_location(div3, file$5, 16, 6, 550);
    			attr_dev(div4, "class", "circle-line");
    			add_location(div4, file$5, 17, 6, 585);
    			attr_dev(div5, "class", "loader loader--3");
    			add_location(div5, file$5, 12, 4, 407);
    			attr_dev(div6, "class", "loader-wrapper loader-wrapper--3");
    			add_location(div6, file$5, 11, 2, 355);
    			attr_dev(div7, "class", "preloaders");
    			attr_dev(div7, "id", "preloader");
    			add_location(div7, file$5, 9, 0, 224);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div6, div5);
    			append_dev(div5, div0);
    			append_dev(div5, t0);
    			append_dev(div5, div1);
    			append_dev(div5, t1);
    			append_dev(div5, div2);
    			append_dev(div5, t2);
    			append_dev(div5, div3);
    			append_dev(div5, t3);
    			append_dev(div5, div4);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Preload', slots, []);

    	window.addEventListener("load", () => {
    		document.getElementById("preloader").style.display = "none";
    		document.body.style.overflow = "visible";
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Preload> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Preload extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Preload",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src\seo\gtm.svelte generated by Svelte v3.44.1 */

    function create_fragment$8(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Gtm', slots, []);

    	(function (w, d, s, l, i) {
    		w[l] = w[l] || [];

    		w[l].push({
    			"gtm.start": new Date().getTime(),
    			event: "gtm.js"
    		});

    		var f = d.getElementsByTagName(s)[0],
    			j = d.createElement(s),
    			dl = l != "dataLayer" ? "&l=" + l : "";

    		j.async = true;
    		j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    		f.parentNode.insertBefore(j, f);
    	})(window, document, "script", "dataLayer", "GTM-NZN5LVK");

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Gtm> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Gtm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Gtm",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\components\dimension.svelte generated by Svelte v3.44.1 */
    const file$4 = "src\\components\\dimension.svelte";

    function create_fragment$7(ctx) {
    	let div4;
    	let div1;
    	let div0;
    	let t0;
    	let h30;
    	let t1;
    	let span0;
    	let t2;
    	let t3;
    	let div3;
    	let h31;
    	let t4;
    	let span1;
    	let t5;
    	let t6;
    	let div2;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			h30 = element("h3");
    			t1 = text("Height : ");
    			span0 = element("span");
    			t2 = text("px");
    			t3 = space();
    			div3 = element("div");
    			h31 = element("h3");
    			t4 = text("Width : ");
    			span1 = element("span");
    			t5 = text("px");
    			t6 = space();
    			div2 = element("div");
    			attr_dev(div0, "class", "height-span");
    			add_location(div0, file$4, 17, 4, 515);
    			attr_dev(span0, "id", "height");
    			add_location(span0, file$4, 18, 17, 561);
    			add_location(h30, file$4, 18, 4, 548);
    			attr_dev(div1, "class", "height");
    			add_location(div1, file$4, 16, 2, 489);
    			attr_dev(span1, "id", "width");
    			add_location(span1, file$4, 21, 16, 639);
    			add_location(h31, file$4, 21, 4, 627);
    			attr_dev(div2, "class", "width-span");
    			add_location(div2, file$4, 22, 4, 671);
    			attr_dev(div3, "class", "width");
    			add_location(div3, file$4, 20, 2, 602);
    			attr_dev(div4, "class", "dimension-div");
    			add_location(div4, file$4, 15, 0, 458);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div1);
    			append_dev(div1, div0);
    			append_dev(div1, t0);
    			append_dev(div1, h30);
    			append_dev(h30, t1);
    			append_dev(h30, span0);
    			append_dev(h30, t2);
    			append_dev(div4, t3);
    			append_dev(div4, div3);
    			append_dev(div3, h31);
    			append_dev(h31, t4);
    			append_dev(h31, span1);
    			append_dev(h31, t5);
    			append_dev(div3, t6);
    			append_dev(div3, div2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Dimension', slots, []);

    	onMount(() => {
    		document.getElementById("height").innerHTML = window.innerHeight;
    		document.getElementById("width").innerHTML = window.innerWidth;
    	});

    	window.addEventListener("resize", () => {
    		document.getElementById("height").innerHTML = window.innerHeight;
    		document.getElementById("width").innerHTML = window.innerWidth;
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Dimension> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ onMount });
    	return [];
    }

    class Dimension extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dimension",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\components\rcuwcu.svelte generated by Svelte v3.44.1 */
    const file$3 = "src\\components\\rcuwcu.svelte";

    function create_fragment$6(ctx) {
    	let div21;
    	let div1;
    	let div0;
    	let t0;
    	let br;
    	let t1;
    	let a0;
    	let t3;
    	let div19;
    	let div10;
    	let div9;
    	let div2;
    	let t5;
    	let div3;
    	let t6;
    	let select;
    	let option0;
    	let option1;
    	let option2;
    	let t10;
    	let div4;
    	let t11;
    	let input0;
    	let t12;
    	let div5;
    	let t13;
    	let input1;
    	let t14;
    	let div8;
    	let button0;
    	let t16;
    	let div7;
    	let t17;
    	let div6;
    	let t19;
    	let div18;
    	let div17;
    	let div11;
    	let t21;
    	let div12;
    	let t22;
    	let input2;
    	let t23;
    	let div13;
    	let t24;
    	let input3;
    	let t25;
    	let div16;
    	let button1;
    	let t27;
    	let div15;
    	let t28;
    	let div14;
    	let t30;
    	let div20;
    	let t31;
    	let a1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div21 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text("A free tool to calculate the throughput in DynamoDB ");
    			br = element("br");
    			t1 = space();
    			a0 = element("a");
    			a0.textContent = "based on this article.";
    			t3 = space();
    			div19 = element("div");
    			div10 = element("div");
    			div9 = element("div");
    			div2 = element("div");
    			div2.textContent = "Calculate Read Capacity Units";
    			t5 = space();
    			div3 = element("div");
    			t6 = text("Select the consistency mode\r\n                ");
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "Select";
    			option1 = element("option");
    			option1.textContent = "Strong consistency";
    			option2 = element("option");
    			option2.textContent = "Eventual consistency";
    			t10 = space();
    			div4 = element("div");
    			t11 = text("No. of Request per second\r\n                    ");
    			input0 = element("input");
    			t12 = space();
    			div5 = element("div");
    			t13 = text("Average size of each item in KB\r\n                    ");
    			input1 = element("input");
    			t14 = space();
    			div8 = element("div");
    			button0 = element("button");
    			button0.textContent = "Get RCU";
    			t16 = space();
    			div7 = element("div");
    			t17 = text("Total WCU = ");
    			div6 = element("div");
    			div6.textContent = "ss";
    			t19 = space();
    			div18 = element("div");
    			div17 = element("div");
    			div11 = element("div");
    			div11.textContent = "Calculate Write Capacity Units";
    			t21 = space();
    			div12 = element("div");
    			t22 = text("No. of Request per second\r\n                    ");
    			input2 = element("input");
    			t23 = space();
    			div13 = element("div");
    			t24 = text("Average size of each item in KB\r\n                    ");
    			input3 = element("input");
    			t25 = space();
    			div16 = element("div");
    			button1 = element("button");
    			button1.textContent = "Get WCU";
    			t27 = space();
    			div15 = element("div");
    			t28 = text("Total WCU = ");
    			div14 = element("div");
    			div14.textContent = "ss";
    			t30 = space();
    			div20 = element("div");
    			t31 = text("Loved this tool, then ");
    			a1 = element("a");
    			a1.textContent = "Tweet it.";
    			add_location(br, file$3, 54, 60, 2109);
    			attr_dev(a0, "href", "https://letsfigureout.com/2020/02/01/calculating-wcu-and-rcu-for-amazon-dynamodb/");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "rel", "noopener noreferrer");
    			add_location(a0, file$3, 55, 8, 2123);
    			attr_dev(div0, "class", "top-wrap");
    			add_location(div0, file$3, 53, 7, 2025);
    			attr_dev(div1, "class", "top");
    			add_location(div1, file$3, 52, 4, 1999);
    			attr_dev(div2, "class", "head");
    			add_location(div2, file$3, 61, 16, 2419);
    			option0.__value = "";
    			option0.value = option0.__value;
    			option0.hidden = true;
    			add_location(option0, file$3, 65, 20, 2648);
    			option1.__value = "1";
    			option1.value = option1.__value;
    			add_location(option1, file$3, 66, 20, 2709);
    			option2.__value = "2";
    			option2.value = option2.__value;
    			add_location(option2, file$3, 67, 20, 2776);
    			attr_dev(select, "name", "select");
    			attr_dev(select, "id", "select");
    			attr_dev(select, "class", "choose");
    			add_location(select, file$3, 64, 16, 2577);
    			attr_dev(div3, "class", "select");
    			add_location(div3, file$3, 62, 16, 2490);
    			attr_dev(input0, "type", "tel");
    			attr_dev(input0, "id", "rps");
    			attr_dev(input0, "placeholder", "100");
    			add_location(input0, file$3, 72, 20, 2978);
    			attr_dev(div4, "class", "req");
    			add_location(div4, file$3, 70, 16, 2892);
    			attr_dev(input1, "type", "tel");
    			attr_dev(input1, "id", "size");
    			attr_dev(input1, "placeholder", "4");
    			add_location(input1, file$3, 76, 20, 3157);
    			attr_dev(div5, "class", "req");
    			add_location(div5, file$3, 74, 16, 3065);
    			attr_dev(button0, "id", "submit");
    			add_location(button0, file$3, 79, 20, 3285);
    			add_location(div6, file$3, 81, 36, 3425);
    			attr_dev(div7, "class", "res");
    			attr_dev(div7, "id", "result");
    			add_location(div7, file$3, 80, 20, 3358);
    			attr_dev(div8, "class", "submit");
    			add_location(div8, file$3, 78, 16, 3243);
    			attr_dev(div9, "class", "box-wrap");
    			add_location(div9, file$3, 60, 12, 2379);
    			attr_dev(div10, "class", "box");
    			add_location(div10, file$3, 59, 8, 2348);
    			attr_dev(div11, "class", "head");
    			add_location(div11, file$3, 88, 16, 3626);
    			attr_dev(input2, "type", "tel");
    			attr_dev(input2, "id", "rps-wcu");
    			attr_dev(input2, "placeholder", "50");
    			add_location(input2, file$3, 92, 20, 3802);
    			attr_dev(div12, "class", "req");
    			add_location(div12, file$3, 90, 16, 3716);
    			attr_dev(input3, "type", "tel");
    			attr_dev(input3, "id", "size-wcu");
    			attr_dev(input3, "placeholder", "4");
    			add_location(input3, file$3, 96, 20, 3984);
    			attr_dev(div13, "class", "req");
    			add_location(div13, file$3, 94, 16, 3892);
    			attr_dev(button1, "id", "submit-wcu");
    			add_location(button1, file$3, 99, 20, 4116);
    			add_location(div14, file$3, 101, 36, 4264);
    			attr_dev(div15, "class", "res");
    			attr_dev(div15, "id", "result-wcu");
    			add_location(div15, file$3, 100, 20, 4193);
    			attr_dev(div16, "class", "submit");
    			add_location(div16, file$3, 98, 16, 4074);
    			attr_dev(div17, "class", "box-wrap wrap-wcu");
    			add_location(div17, file$3, 87, 12, 3577);
    			attr_dev(div18, "class", "box wcu-box");
    			add_location(div18, file$3, 86, 8, 3538);
    			attr_dev(div19, "class", "flex-box");
    			add_location(div19, file$3, 58, 4, 2316);
    			attr_dev(a1, "href", "https://twitter.com/intent/tweet?url=https://rahulahire.com/dynamodb-wrcu");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "rel", "noopener noreferrer");
    			add_location(a1, file$3, 108, 30, 4440);
    			attr_dev(div20, "class", "tweet-box");
    			add_location(div20, file$3, 107, 4, 4385);
    			attr_dev(div21, "class", "container");
    			add_location(div21, file$3, 51, 0, 1970);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div21, anchor);
    			append_dev(div21, div1);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div0, br);
    			append_dev(div0, t1);
    			append_dev(div0, a0);
    			append_dev(div21, t3);
    			append_dev(div21, div19);
    			append_dev(div19, div10);
    			append_dev(div10, div9);
    			append_dev(div9, div2);
    			append_dev(div9, t5);
    			append_dev(div9, div3);
    			append_dev(div3, t6);
    			append_dev(div3, select);
    			append_dev(select, option0);
    			append_dev(select, option1);
    			append_dev(select, option2);
    			append_dev(div9, t10);
    			append_dev(div9, div4);
    			append_dev(div4, t11);
    			append_dev(div4, input0);
    			append_dev(div9, t12);
    			append_dev(div9, div5);
    			append_dev(div5, t13);
    			append_dev(div5, input1);
    			append_dev(div9, t14);
    			append_dev(div9, div8);
    			append_dev(div8, button0);
    			append_dev(div8, t16);
    			append_dev(div8, div7);
    			append_dev(div7, t17);
    			append_dev(div7, div6);
    			append_dev(div19, t19);
    			append_dev(div19, div18);
    			append_dev(div18, div17);
    			append_dev(div17, div11);
    			append_dev(div17, t21);
    			append_dev(div17, div12);
    			append_dev(div12, t22);
    			append_dev(div12, input2);
    			append_dev(div17, t23);
    			append_dev(div17, div13);
    			append_dev(div13, t24);
    			append_dev(div13, input3);
    			append_dev(div17, t25);
    			append_dev(div17, div16);
    			append_dev(div16, button1);
    			append_dev(div16, t27);
    			append_dev(div16, div15);
    			append_dev(div15, t28);
    			append_dev(div15, div14);
    			append_dev(div21, t30);
    			append_dev(div21, div20);
    			append_dev(div20, t31);
    			append_dev(div20, a1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*rcu*/ ctx[0], false, false, false),
    					listen_dev(button1, "click", /*wcu*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div21);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Rcuwcu', slots, []);

    	const rcu = () => {
    		const rps = document.getElementById('rps');
    		const size = document.getElementById('size');
    		document.getElementById('submit');
    		const select = document.getElementById('select');
    		if (select.value === '') alert('Select consistency mode');

    		if (select.value !== '' && rps.value === '') {
    			alert('Enter the no. of request/Sec');
    		}

    		if (rps.value !== '' && size.value === '') {
    			alert('Enter the size of item');
    		}

    		if (rps.value !== "" && isFinite(`${rps.value}`) === false || size.value !== "" && isFinite(`${size.value}`) === false) {
    			alert('Entered value is not a number');
    		}

    		const result = rps.value * Math.round(size.value) / (4 * select.value) + 1;
    		const resDisplay = document.getElementById('result');
    		resDisplay.style.display = 'flex';
    		resDisplay.innerHTML = `Total RCU = <div  >${result}</div>`;
    	};

    	const wcu = () => {
    		const rpsWcu = document.getElementById('rps-wcu');
    		const sizeWcu = document.getElementById('size-wcu');
    		document.getElementById('submit-wcu');

    		if (rpsWcu.value === '') {
    			alert('Enter the no. of request/Sec');
    		}

    		if (rpsWcu.value !== '' && sizeWcu.value === '') {
    			alert('Enter the size of item');
    		}

    		if (rpsWcu.value !== "" && isFinite(`${rpsWcu.value}`) === false || sizeWcu.value !== "" && isFinite(`${sizeWcu.value}`) === false) {
    			alert('Entered value is not a number');
    		}

    		const result = rpsWcu.value * Math.round(sizeWcu.value);
    		const resDisplay = document.getElementById('result-wcu');
    		resDisplay.style.display = 'flex';
    		resDisplay.innerHTML = `Total WCU = <div  >${result}</div>`;
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Rcuwcu> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ rcu, wcu });
    	return [rcu, wcu];
    }

    class Rcuwcu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Rcuwcu",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\components\home.svelte generated by Svelte v3.44.1 */

    const { document: document_1 } = globals;
    const file$2 = "src\\components\\home.svelte";

    function create_fragment$5(ctx) {
    	let link0;
    	let link1;
    	let t0;
    	let section0;
    	let div1;
    	let div0;
    	let h10;
    	let t2;
    	let p0;
    	let t4;
    	let div3;
    	let video0;
    	let track0;
    	let video0_src_value;
    	let t5;
    	let div2;
    	let t6;
    	let div5;
    	let div4;
    	let h11;
    	let t8;
    	let p1;
    	let t10;
    	let section1;
    	let div7;
    	let div6;
    	let h30;
    	let t12;
    	let p2;
    	let t13;
    	let a0;
    	let t15;
    	let t16;
    	let div8;
    	let video1;
    	let track1;
    	let video1_src_value;
    	let t17;
    	let div10;
    	let div9;
    	let h31;
    	let t19;
    	let p3;
    	let t20;
    	let a1;
    	let t22;
    	let t23;
    	let section2;
    	let div12;
    	let div11;
    	let h32;
    	let t25;
    	let p4;
    	let t27;
    	let div13;
    	let video2;
    	let track2;
    	let video2_src_value;
    	let t28;
    	let div15;
    	let div14;
    	let h33;
    	let t30;
    	let p5;
    	let t32;
    	let section3;
    	let div17;
    	let div16;
    	let p6;
    	let t34;
    	let div18;
    	let video3;
    	let track3;
    	let video3_src_value;
    	let t35;
    	let div20;
    	let div19;
    	let p7;
    	let t37;
    	let section4;
    	let div22;
    	let div21;
    	let p8;
    	let t39;
    	let div23;
    	let video4;
    	let track4;
    	let video4_src_value;
    	let t40;
    	let div25;
    	let div24;
    	let p9;
    	let t42;
    	let section5;
    	let div26;
    	let h34;
    	let t44;
    	let section6;
    	let div27;
    	let p10;
    	let t46;
    	let ol;
    	let li0;
    	let t48;
    	let li1;
    	let t50;
    	let li2;
    	let t51;
    	let a2;
    	let t53;
    	let t54;
    	let footer;
    	let div34;
    	let div28;
    	let t55;
    	let a3;
    	let t57;
    	let div33;
    	let div29;
    	let a4;
    	let img0;
    	let img0_src_value;
    	let t58;
    	let t59;
    	let div30;
    	let a5;
    	let img1;
    	let img1_src_value;
    	let t60;
    	let t61;
    	let div31;
    	let a6;
    	let img2;
    	let img2_src_value;
    	let t62;
    	let t63;
    	let div32;
    	let a7;
    	let img3;
    	let img3_src_value;
    	let t64;

    	const block = {
    		c: function create() {
    			link0 = element("link");
    			link1 = element("link");
    			t0 = space();
    			section0 = element("section");
    			div1 = element("div");
    			div0 = element("div");
    			h10 = element("h1");
    			h10.textContent = "Hi, I'm Rahul Ahire";
    			t2 = space();
    			p0 = element("p");
    			p0.textContent = "I'm mostly a self Taught Person. I have diverse interest in Tech,\r\n        Programming, Human nature and how the world operates. Professionally, I\r\n        know Fullstack Javascript and AWS serverless.";
    			t4 = space();
    			div3 = element("div");
    			video0 = element("video");
    			track0 = element("track");
    			t5 = space();
    			div2 = element("div");
    			t6 = space();
    			div5 = element("div");
    			div4 = element("div");
    			h11 = element("h1");
    			h11.textContent = "Hi, I'm Rahul Ahire";
    			t8 = space();
    			p1 = element("p");
    			p1.textContent = "I'm mostly a self Taught Person. I have diverse interest in Tech,\r\n        Programming, Human nature and how the world operates. Professionally, I\r\n        know Fullstack Javascript and AWS serverless.";
    			t10 = space();
    			section1 = element("section");
    			div7 = element("div");
    			div6 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Pune, the City where I live";
    			t12 = space();
    			p2 = element("p");
    			t13 = text("Be it Gandhi, Britishers or Shri Chhatrapati Shivaji Maharaj, Pune was\r\n        an important administrative area for these mens. Pune has its own rich\r\n        cultural history. ");
    			a0 = element("a");
    			a0.textContent = "Know more";
    			t15 = text(".");
    			t16 = space();
    			div8 = element("div");
    			video1 = element("video");
    			track1 = element("track");
    			t17 = space();
    			div10 = element("div");
    			div9 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Pune, the City where I live";
    			t19 = space();
    			p3 = element("p");
    			t20 = text("Be it Gandhi, Britishers or Shri Chhatrapati Shivaji Maharaj, Pune was\r\n        an important administrative area for these mens. Pune has its own rich\r\n        cultural history. ");
    			a1 = element("a");
    			a1.textContent = "Know more";
    			t22 = text(".");
    			t23 = space();
    			section2 = element("section");
    			div12 = element("div");
    			div11 = element("div");
    			h32 = element("h3");
    			h32.textContent = "Shirur...";
    			t25 = space();
    			p4 = element("p");
    			p4.textContent = "Although, I live in Pune but I was born, raised and lived first 16 years\r\n        of my life in this town.";
    			t27 = space();
    			div13 = element("div");
    			video2 = element("video");
    			track2 = element("track");
    			t28 = space();
    			div15 = element("div");
    			div14 = element("div");
    			h33 = element("h3");
    			h33.textContent = "Shirur...";
    			t30 = space();
    			p5 = element("p");
    			p5.textContent = "Although, I live in Pune but I was born, raised and lived first 16 years\r\n        of my life in this town.";
    			t32 = space();
    			section3 = element("section");
    			div17 = element("div");
    			div16 = element("div");
    			p6 = element("p");
    			p6.textContent = "Ever since my childhood I've always been facinated with all shows like Cosmos, Curiosity, Into the wormhole with Morgan\r\n        Freeman,etc. Questioning on the mechanics of the Universe has always\r\n        kinda felt spiritual to me. Although I've no in-depth Knowledge on\r\n        Astrophysics, This is definitely something I'll be looking forward in\r\n        future.";
    			t34 = space();
    			div18 = element("div");
    			video3 = element("video");
    			track3 = element("track");
    			t35 = space();
    			div20 = element("div");
    			div19 = element("div");
    			p7 = element("p");
    			p7.textContent = "Ever since my childhood I've always been facinated with all shows like Cosmos, Curiosity, Into the wormhole with Morgan\r\n        Freeman,etc. Questioning on the mechanics of the Universe has always\r\n        kinda felt spiritual to me. Although I've no in-depth Knowledge on\r\n        Astrophysics, This is definitely something I'll be looking forward in\r\n        future.";
    			t37 = space();
    			section4 = element("section");
    			div22 = element("div");
    			div21 = element("div");
    			p8 = element("p");
    			p8.textContent = "As I had interest in Space science I decided to study for JEE after my\r\n        10th grade. Little did I knew how f'd I would be in that process. Amidst all of the\r\n        chaos, in 2017 I discovered Elon Musk on YouTube and got the first handhold\r\n        experience of capitalism and what Entrepreneurship can do for the\r\n        society. And, that opened my eyes for various possibilities.";
    			t39 = space();
    			div23 = element("div");
    			video4 = element("video");
    			track4 = element("track");
    			t40 = space();
    			div25 = element("div");
    			div24 = element("div");
    			p9 = element("p");
    			p9.textContent = "As I had interest in Space science I decided to study for JEE after my\r\n        10th grade. Little did I knew how f'd I would be in that process. Amidst all of the\r\n        chaos, in 2017 I discovered Elon Musk on YouTube and got the first handhold\r\n        experience of capitalism and what Entrepreneurship can do for the\r\n        society. And, that opened my eyes for various possibilities.";
    			t42 = space();
    			section5 = element("section");
    			div26 = element("div");
    			h34 = element("h3");
    			h34.textContent = "My Future Plans";
    			t44 = space();
    			section6 = element("section");
    			div27 = element("div");
    			p10 = element("p");
    			p10.textContent = "Since 2018, I've got to learn on various things and taking those inspiration, Within next 10 years I want to expand in these three area.";
    			t46 = space();
    			ol = element("ol");
    			li0 = element("li");
    			li0.textContent = "Simplified P2P file sharing and efficient media collaboration platform for Tech companies and Content Creator. Details regarding this will be updated later.";
    			t48 = space();
    			li1 = element("li");
    			li1.textContent = "Data is the new oil. Just like how FB, Google use your private data to serve you personalised ads, I think using the same data and doing a proper analysis over it taking consider of human motivation can be used to improve and automate our life since everything that we do has a digital footprint.";
    			t50 = space();
    			li2 = element("li");
    			t51 = text("I've been utterly mesmerised by how Elon Musk and his team at Neuralink has achieved the feat in Brain Computer Interface in just 3-4 years that whole medical industry hasn't been able to figure out in last 3 decades. Also taking inspiration from business model of ");
    			a2 = element("a");
    			a2.textContent = "Linus Tech Tips";
    			t53 = text(", I have lots of question around Astrophysics to which I want to solve by creating a edu-media research organisation and connect ancient knowledge with modern age science which we are disconnected. I find there's immense value for society to regain new awarness from it.");
    			t54 = space();
    			footer = element("footer");
    			div34 = element("div");
    			div28 = element("div");
    			t55 = text("If you got some Ideas, Feedback or suggestion, Please send it my way ");
    			a3 = element("a");
    			a3.textContent = "info@RahulAhire.com";
    			t57 = space();
    			div33 = element("div");
    			div29 = element("div");
    			a4 = element("a");
    			img0 = element("img");
    			t58 = text(" Twitter");
    			t59 = space();
    			div30 = element("div");
    			a5 = element("a");
    			img1 = element("img");
    			t60 = text(" LinkedIn");
    			t61 = space();
    			div31 = element("div");
    			a6 = element("a");
    			img2 = element("img");
    			t62 = text(" Github");
    			t63 = space();
    			div32 = element("div");
    			a7 = element("a");
    			img3 = element("img");
    			t64 = text(" Instagram");
    			attr_dev(link0, "href", "https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Lato:wght@300;400&family=Lobster+Two&family=Open+Sans:wght@400;500&family=Righteous&family=Shippori+Antique+B1&display=swap");
    			attr_dev(link0, "rel", "stylesheet");
    			add_location(link0, file$2, 35, 2, 1025);
    			document_1.title = "Hi, I'm Rahul Ahire";
    			attr_dev(link1, "rel", "icon");
    			attr_dev(link1, "type", "image/x-icon");
    			attr_dev(link1, "href", "https://s3.ap-south-1.amazonaws.com/rahulahire.com/blackhole.ico");
    			add_location(link1, file$2, 40, 2, 1304);
    			attr_dev(h10, "class", "svelte-1j8wnb5");
    			add_location(h10, file$2, 50, 6, 1559);
    			attr_dev(p0, "class", "svelte-1j8wnb5");
    			add_location(p0, file$2, 51, 6, 1595);
    			attr_dev(div0, "class", "sd-wrapper  svelte-1j8wnb5");
    			add_location(div0, file$2, 49, 4, 1526);
    			attr_dev(div1, "class", "sidedrawer sd-sec1 svelte-1j8wnb5");
    			add_location(div1, file$2, 48, 2, 1488);
    			attr_dev(track0, "kind", "captions");
    			add_location(track0, file$2, 60, 7, 1958);
    			if (!src_url_equal(video0.src, video0_src_value = "./assets/sec1-halftone.mp4")) attr_dev(video0, "src", video0_src_value);
    			video0.muted = true;
    			attr_dev(video0, "id", "vid1");
    			attr_dev(video0, "class", "video svelte-1j8wnb5");
    			add_location(video0, file$2, 59, 4, 1880);
    			attr_dev(div2, "class", "vid1-dimmer svelte-1j8wnb5");
    			add_location(div2, file$2, 62, 4, 2003);
    			attr_dev(div3, "class", "vid-container svelte-1j8wnb5");
    			add_location(div3, file$2, 58, 2, 1847);
    			attr_dev(h11, "class", "svelte-1j8wnb5");
    			add_location(h11, file$2, 66, 6, 2122);
    			attr_dev(p1, "class", "svelte-1j8wnb5");
    			add_location(p1, file$2, 67, 6, 2158);
    			attr_dev(div4, "class", "sd-wrapper sd-mobi svelte-1j8wnb5");
    			add_location(div4, file$2, 65, 4, 2082);
    			attr_dev(div5, "class", "mob-drawer sd-sec1 svelte-1j8wnb5");
    			add_location(div5, file$2, 64, 2, 2044);
    			attr_dev(section0, "class", "sec-container svelte-1j8wnb5");
    			add_location(section0, file$2, 47, 0, 1453);
    			attr_dev(h30, "class", "svelte-1j8wnb5");
    			add_location(h30, file$2, 79, 6, 2528);
    			attr_dev(a0, "href", "https://en.wikipedia.org/wiki/Pune");
    			attr_dev(a0, "class", "svelte-1j8wnb5");
    			add_location(a0, file$2, 83, 26, 2763);
    			attr_dev(p2, "class", "svelte-1j8wnb5");
    			add_location(p2, file$2, 80, 6, 2572);
    			attr_dev(div6, "class", "sd-wrapper  svelte-1j8wnb5");
    			add_location(div6, file$2, 78, 4, 2495);
    			attr_dev(div7, "class", "sidedrawer sd-sec2 svelte-1j8wnb5");
    			add_location(div7, file$2, 77, 2, 2457);
    			attr_dev(track1, "kind", "captions");
    			add_location(track1, file$2, 91, 7, 2992);
    			if (!src_url_equal(video1.src, video1_src_value = "./assets/pune-3d-view.mp4")) attr_dev(video1, "src", video1_src_value);
    			video1.muted = true;
    			attr_dev(video1, "id", "vid2");
    			attr_dev(video1, "class", "video svelte-1j8wnb5");
    			add_location(video1, file$2, 90, 4, 2915);
    			attr_dev(div8, "class", "vid-container svelte-1j8wnb5");
    			add_location(div8, file$2, 89, 2, 2882);
    			attr_dev(h31, "class", "svelte-1j8wnb5");
    			add_location(h31, file$2, 96, 6, 3123);
    			attr_dev(a1, "href", "https://en.wikipedia.org/wiki/Pune");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "class", "svelte-1j8wnb5");
    			add_location(a1, file$2, 100, 26, 3358);
    			attr_dev(p3, "class", "svelte-1j8wnb5");
    			add_location(p3, file$2, 97, 6, 3167);
    			attr_dev(div9, "class", "sd-wrapper sd-mobi svelte-1j8wnb5");
    			add_location(div9, file$2, 95, 4, 3083);
    			attr_dev(div10, "class", "mob-drawer sd-sec2 svelte-1j8wnb5");
    			add_location(div10, file$2, 94, 2, 3045);
    			attr_dev(section1, "class", "sec-container svelte-1j8wnb5");
    			add_location(section1, file$2, 76, 0, 2422);
    			attr_dev(h32, "class", " svelte-1j8wnb5");
    			add_location(h32, file$2, 112, 6, 3621);
    			attr_dev(p4, "class", "svelte-1j8wnb5");
    			add_location(p4, file$2, 113, 6, 3656);
    			attr_dev(div11, "class", "sd-wrapper  svelte-1j8wnb5");
    			add_location(div11, file$2, 111, 4, 3588);
    			attr_dev(div12, "class", "sidedrawer sd-sec3 svelte-1j8wnb5");
    			add_location(div12, file$2, 110, 2, 3550);
    			attr_dev(track2, "kind", "captions");
    			add_location(track2, file$2, 121, 7, 3925);
    			if (!src_url_equal(video2.src, video2_src_value = "./assets/pune-to-shirur.mp4")) attr_dev(video2, "src", video2_src_value);
    			video2.muted = true;
    			attr_dev(video2, "id", "vid3");
    			attr_dev(video2, "class", "video svelte-1j8wnb5");
    			add_location(video2, file$2, 120, 4, 3846);
    			attr_dev(div13, "class", "vid-container svelte-1j8wnb5");
    			add_location(div13, file$2, 119, 2, 3813);
    			attr_dev(h33, "class", " svelte-1j8wnb5");
    			add_location(h33, file$2, 126, 6, 4056);
    			attr_dev(p5, "class", "svelte-1j8wnb5");
    			add_location(p5, file$2, 127, 6, 4091);
    			attr_dev(div14, "class", "sd-wrapper sd-mobi svelte-1j8wnb5");
    			add_location(div14, file$2, 125, 4, 4016);
    			attr_dev(div15, "class", "mob-drawer sd-sec3 svelte-1j8wnb5");
    			add_location(div15, file$2, 124, 2, 3978);
    			attr_dev(section2, "class", "sec-container svelte-1j8wnb5");
    			add_location(section2, file$2, 109, 0, 3515);
    			attr_dev(p6, "class", "svelte-1j8wnb5");
    			add_location(p6, file$2, 138, 6, 4371);
    			attr_dev(div16, "class", "sd-wrapper  svelte-1j8wnb5");
    			add_location(div16, file$2, 137, 4, 4338);
    			attr_dev(div17, "class", "sidedrawer sd-sec3 sd-4 svelte-1j8wnb5");
    			add_location(div17, file$2, 136, 2, 4295);
    			attr_dev(track3, "kind", "captions");
    			add_location(track3, file$2, 149, 7, 4902);
    			if (!src_url_equal(video3.src, video3_src_value = "./assets/my-facination.mp4")) attr_dev(video3, "src", video3_src_value);
    			video3.muted = true;
    			attr_dev(video3, "id", "vid4");
    			attr_dev(video3, "class", "video svelte-1j8wnb5");
    			add_location(video3, file$2, 148, 4, 4824);
    			attr_dev(div18, "class", "vid-container svelte-1j8wnb5");
    			add_location(div18, file$2, 147, 2, 4791);
    			attr_dev(p7, "class", "svelte-1j8wnb5");
    			add_location(p7, file$2, 154, 6, 5038);
    			attr_dev(div19, "class", "sd-wrapper sd-mobi svelte-1j8wnb5");
    			add_location(div19, file$2, 153, 4, 4998);
    			attr_dev(div20, "class", "mob-drawer sd-sec3 sd-4 svelte-1j8wnb5");
    			add_location(div20, file$2, 152, 2, 4955);
    			attr_dev(section3, "class", "sec-container svelte-1j8wnb5");
    			add_location(section3, file$2, 135, 0, 4260);
    			attr_dev(p8, "class", "svelte-1j8wnb5");
    			add_location(p8, file$2, 167, 6, 5579);
    			attr_dev(div21, "class", "sd-wrapper  svelte-1j8wnb5");
    			add_location(div21, file$2, 166, 4, 5546);
    			attr_dev(div22, "class", "sidedrawer sd-sec3 sd-5 svelte-1j8wnb5");
    			add_location(div22, file$2, 165, 2, 5503);
    			attr_dev(track4, "kind", "captions");
    			add_location(track4, file$2, 178, 7, 6130);
    			if (!src_url_equal(video4.src, video4_src_value = "./assets/elon-musk.mp4")) attr_dev(video4, "src", video4_src_value);
    			video4.muted = true;
    			attr_dev(video4, "id", "vid5");
    			attr_dev(video4, "class", "video svelte-1j8wnb5");
    			add_location(video4, file$2, 177, 4, 6056);
    			attr_dev(div23, "class", "vid-container svelte-1j8wnb5");
    			add_location(div23, file$2, 176, 2, 6023);
    			attr_dev(p9, "class", "svelte-1j8wnb5");
    			add_location(p9, file$2, 183, 6, 6266);
    			attr_dev(div24, "class", "sd-wrapper sd-mobi svelte-1j8wnb5");
    			add_location(div24, file$2, 182, 4, 6226);
    			attr_dev(div25, "class", "mob-drawer sd-sec3 sd-5 svelte-1j8wnb5");
    			add_location(div25, file$2, 181, 2, 6183);
    			attr_dev(section4, "class", "sec-container svelte-1j8wnb5");
    			add_location(section4, file$2, 164, 0, 5468);
    			attr_dev(h34, "class", "svelte-1j8wnb5");
    			add_location(h34, file$2, 195, 4, 6780);
    			attr_dev(div26, "class", "pink-grid");
    			add_location(div26, file$2, 194, 2, 6751);
    			attr_dev(section5, "class", "pink-wrap svelte-1j8wnb5");
    			add_location(section5, file$2, 193, 0, 6720);
    			attr_dev(p10, "class", "svelte-1j8wnb5");
    			add_location(p10, file$2, 200, 4, 6887);
    			attr_dev(li0, "class", "svelte-1j8wnb5");
    			add_location(li0, file$2, 202, 6, 7048);
    			attr_dev(li1, "class", "svelte-1j8wnb5");
    			add_location(li1, file$2, 203, 6, 7221);
    			attr_dev(a2, "href", "https://www.youtube.com/c/LinusTechTips");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "title", "Linus Tech Tips");
    			attr_dev(a2, "class", "svelte-1j8wnb5");
    			add_location(a2, file$2, 204, 275, 7803);
    			attr_dev(li2, "class", "svelte-1j8wnb5");
    			add_location(li2, file$2, 204, 6, 7534);
    			add_location(ol, file$2, 201, 4, 7036);
    			attr_dev(div27, "class", "future-wrap svelte-1j8wnb5");
    			add_location(div27, file$2, 199, 2, 6856);
    			attr_dev(section6, "class", "future svelte-1j8wnb5");
    			add_location(section6, file$2, 198, 0, 6828);
    			attr_dev(a3, "href", "mailto:info@rahulahire.com");
    			attr_dev(a3, "class", "svelte-1j8wnb5");
    			add_location(a3, file$2, 211, 75, 8361);
    			attr_dev(div28, "class", "email svelte-1j8wnb5");
    			add_location(div28, file$2, 210, 4, 8265);
    			if (!src_url_equal(img0.src, img0_src_value = "https://s3.ap-south-1.amazonaws.com/rahulahire.com/twitter.svg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "logo");
    			attr_dev(img0, "class", "svelte-1j8wnb5");
    			add_location(img0, file$2, 217, 10, 8586);
    			attr_dev(a4, "href", "https://twitter.com/MeRahulAhire");
    			attr_dev(a4, "target", "_blank");
    			attr_dev(a4, "class", "svelte-1j8wnb5");
    			add_location(a4, file$2, 215, 8, 8505);
    			attr_dev(div29, "class", "links l1 svelte-1j8wnb5");
    			add_location(div29, file$2, 214, 6, 8473);
    			if (!src_url_equal(img1.src, img1_src_value = "https://s3.ap-south-1.amazonaws.com/rahulahire.com/linkedin.svg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "logo");
    			attr_dev(img1, "class", "svelte-1j8wnb5");
    			add_location(img1, file$2, 224, 10, 8842);
    			attr_dev(a5, "href", "https://linkedIn.com/in/MeRahulAhire");
    			attr_dev(a5, "target", "_blank");
    			attr_dev(a5, "class", "svelte-1j8wnb5");
    			add_location(a5, file$2, 221, 8, 8747);
    			attr_dev(div30, "class", "links l2 svelte-1j8wnb5");
    			add_location(div30, file$2, 220, 6, 8715);
    			if (!src_url_equal(img2.src, img2_src_value = "https://s3.ap-south-1.amazonaws.com/rahulahire.com/github.svg")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "logo");
    			attr_dev(img2, "class", "svelte-1j8wnb5");
    			add_location(img2, file$2, 230, 10, 9085);
    			attr_dev(a6, "href", "https://GitHub.com/MeRahulAhire");
    			attr_dev(a6, "target", "_blank");
    			attr_dev(a6, "class", "svelte-1j8wnb5");
    			add_location(a6, file$2, 228, 8, 9005);
    			attr_dev(div31, "class", "links l3 svelte-1j8wnb5");
    			add_location(div31, file$2, 227, 6, 8973);
    			if (!src_url_equal(img3.src, img3_src_value = "https://s3.ap-south-1.amazonaws.com/rahulahire.com/instagram.svg")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "logo");
    			attr_dev(img3, "class", "svelte-1j8wnb5");
    			add_location(img3, file$2, 236, 10, 9327);
    			attr_dev(a7, "href", "https://Instagram.com/MeRahulAhire");
    			attr_dev(a7, "target", "_blank");
    			attr_dev(a7, "class", "svelte-1j8wnb5");
    			add_location(a7, file$2, 234, 8, 9244);
    			attr_dev(div32, "class", "links l4 svelte-1j8wnb5");
    			add_location(div32, file$2, 233, 6, 9212);
    			attr_dev(div33, "class", "social-links svelte-1j8wnb5");
    			add_location(div33, file$2, 213, 4, 8439);
    			attr_dev(div34, "class", "footer-wrap svelte-1j8wnb5");
    			add_location(div34, file$2, 209, 2, 8234);
    			attr_dev(footer, "class", "svelte-1j8wnb5");
    			add_location(footer, file$2, 208, 0, 8222);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document_1.head, link0);
    			append_dev(document_1.head, link1);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section0, anchor);
    			append_dev(section0, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h10);
    			append_dev(div0, t2);
    			append_dev(div0, p0);
    			append_dev(section0, t4);
    			append_dev(section0, div3);
    			append_dev(div3, video0);
    			append_dev(video0, track0);
    			append_dev(div3, t5);
    			append_dev(div3, div2);
    			append_dev(section0, t6);
    			append_dev(section0, div5);
    			append_dev(div5, div4);
    			append_dev(div4, h11);
    			append_dev(div4, t8);
    			append_dev(div4, p1);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, section1, anchor);
    			append_dev(section1, div7);
    			append_dev(div7, div6);
    			append_dev(div6, h30);
    			append_dev(div6, t12);
    			append_dev(div6, p2);
    			append_dev(p2, t13);
    			append_dev(p2, a0);
    			append_dev(p2, t15);
    			append_dev(section1, t16);
    			append_dev(section1, div8);
    			append_dev(div8, video1);
    			append_dev(video1, track1);
    			append_dev(section1, t17);
    			append_dev(section1, div10);
    			append_dev(div10, div9);
    			append_dev(div9, h31);
    			append_dev(div9, t19);
    			append_dev(div9, p3);
    			append_dev(p3, t20);
    			append_dev(p3, a1);
    			append_dev(p3, t22);
    			insert_dev(target, t23, anchor);
    			insert_dev(target, section2, anchor);
    			append_dev(section2, div12);
    			append_dev(div12, div11);
    			append_dev(div11, h32);
    			append_dev(div11, t25);
    			append_dev(div11, p4);
    			append_dev(section2, t27);
    			append_dev(section2, div13);
    			append_dev(div13, video2);
    			append_dev(video2, track2);
    			append_dev(section2, t28);
    			append_dev(section2, div15);
    			append_dev(div15, div14);
    			append_dev(div14, h33);
    			append_dev(div14, t30);
    			append_dev(div14, p5);
    			insert_dev(target, t32, anchor);
    			insert_dev(target, section3, anchor);
    			append_dev(section3, div17);
    			append_dev(div17, div16);
    			append_dev(div16, p6);
    			append_dev(section3, t34);
    			append_dev(section3, div18);
    			append_dev(div18, video3);
    			append_dev(video3, track3);
    			append_dev(section3, t35);
    			append_dev(section3, div20);
    			append_dev(div20, div19);
    			append_dev(div19, p7);
    			insert_dev(target, t37, anchor);
    			insert_dev(target, section4, anchor);
    			append_dev(section4, div22);
    			append_dev(div22, div21);
    			append_dev(div21, p8);
    			append_dev(section4, t39);
    			append_dev(section4, div23);
    			append_dev(div23, video4);
    			append_dev(video4, track4);
    			append_dev(section4, t40);
    			append_dev(section4, div25);
    			append_dev(div25, div24);
    			append_dev(div24, p9);
    			insert_dev(target, t42, anchor);
    			insert_dev(target, section5, anchor);
    			append_dev(section5, div26);
    			append_dev(div26, h34);
    			insert_dev(target, t44, anchor);
    			insert_dev(target, section6, anchor);
    			append_dev(section6, div27);
    			append_dev(div27, p10);
    			append_dev(div27, t46);
    			append_dev(div27, ol);
    			append_dev(ol, li0);
    			append_dev(ol, t48);
    			append_dev(ol, li1);
    			append_dev(ol, t50);
    			append_dev(ol, li2);
    			append_dev(li2, t51);
    			append_dev(li2, a2);
    			append_dev(li2, t53);
    			insert_dev(target, t54, anchor);
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div34);
    			append_dev(div34, div28);
    			append_dev(div28, t55);
    			append_dev(div28, a3);
    			append_dev(div34, t57);
    			append_dev(div34, div33);
    			append_dev(div33, div29);
    			append_dev(div29, a4);
    			append_dev(a4, img0);
    			append_dev(a4, t58);
    			append_dev(div33, t59);
    			append_dev(div33, div30);
    			append_dev(div30, a5);
    			append_dev(a5, img1);
    			append_dev(a5, t60);
    			append_dev(div33, t61);
    			append_dev(div33, div31);
    			append_dev(div31, a6);
    			append_dev(a6, img2);
    			append_dev(a6, t62);
    			append_dev(div33, t63);
    			append_dev(div33, div32);
    			append_dev(div32, a7);
    			append_dev(a7, img3);
    			append_dev(a7, t64);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			detach_dev(link0);
    			detach_dev(link1);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section0);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(section1);
    			if (detaching) detach_dev(t23);
    			if (detaching) detach_dev(section2);
    			if (detaching) detach_dev(t32);
    			if (detaching) detach_dev(section3);
    			if (detaching) detach_dev(t37);
    			if (detaching) detach_dev(section4);
    			if (detaching) detach_dev(t42);
    			if (detaching) detach_dev(section5);
    			if (detaching) detach_dev(t44);
    			if (detaching) detach_dev(section6);
    			if (detaching) detach_dev(t54);
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	let isSec2Scrolled = false;
    	let isSec3Scrolled = false;
    	let isSec4Scrolled = false;
    	let isSec5Scrolled = false;

    	window.addEventListener("load", () => {
    		document.getElementById("vid1").play();
    	});

    	window.addEventListener("scroll", () => {
    		const scrollPosition = window.scrollY / window.innerHeight * 100;
    		const vid2 = document.getElementById("vid2");
    		const vid3 = document.getElementById("vid3");
    		const vid4 = document.getElementById("vid4");
    		const vid5 = document.getElementById("vid5");

    		if (scrollPosition > 69 && !isSec2Scrolled) {
    			vid2.play();
    			isSec2Scrolled = true;
    		}

    		if (scrollPosition > 169 && !isSec3Scrolled) {
    			vid3.play();
    			isSec3Scrolled = true;
    		}

    		if (scrollPosition > 269 && !isSec4Scrolled) {
    			vid4.play();
    			isSec4Scrolled = true;
    		}

    		if (scrollPosition > 369 && !isSec5Scrolled) {
    			vid5.play();
    			isSec5Scrolled = true;
    		}
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		isSec2Scrolled,
    		isSec3Scrolled,
    		isSec4Scrolled,
    		isSec5Scrolled
    	});

    	$$self.$inject_state = $$props => {
    		if ('isSec2Scrolled' in $$props) isSec2Scrolled = $$props.isSec2Scrolled;
    		if ('isSec3Scrolled' in $$props) isSec3Scrolled = $$props.isSec3Scrolled;
    		if ('isSec4Scrolled' in $$props) isSec4Scrolled = $$props.isSec4Scrolled;
    		if ('isSec5Scrolled' in $$props) isSec5Scrolled = $$props.isSec5Scrolled;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const LOCATION = {};
    const ROUTER = {};

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    function getLocation(source) {
      return {
        ...source.location,
        state: source.history.state,
        key: (source.history.state && source.history.state.key) || "initial"
      };
    }

    function createHistory(source, options) {
      const listeners = [];
      let location = getLocation(source);

      return {
        get location() {
          return location;
        },

        listen(listener) {
          listeners.push(listener);

          const popstateListener = () => {
            location = getLocation(source);
            listener({ location, action: "POP" });
          };

          source.addEventListener("popstate", popstateListener);

          return () => {
            source.removeEventListener("popstate", popstateListener);

            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
          };
        },

        navigate(to, { state, replace = false } = {}) {
          state = { ...state, key: Date.now() + "" };
          // try...catch iOS Safari limits to 100 pushState calls
          try {
            if (replace) {
              source.history.replaceState(state, null, to);
            } else {
              source.history.pushState(state, null, to);
            }
          } catch (e) {
            source.location[replace ? "replace" : "assign"](to);
          }

          location = getLocation(source);
          listeners.forEach(listener => listener({ location, action: "PUSH" }));
        }
      };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
      let index = 0;
      const stack = [{ pathname: initialPathname, search: "" }];
      const states = [];

      return {
        get location() {
          return stack[index];
        },
        addEventListener(name, fn) {},
        removeEventListener(name, fn) {},
        history: {
          get entries() {
            return stack;
          },
          get index() {
            return index;
          },
          get state() {
            return states[index];
          },
          pushState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            index++;
            stack.push({ pathname, search });
            states.push(state);
          },
          replaceState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            stack[index] = { pathname, search };
            states[index] = state;
          }
        }
      };
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = Boolean(
      typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
    const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
    const { navigate } = globalHistory;

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    const paramRe = /^:(.+)/;

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    function isRootSegment(segment) {
      return segment === "";
    }

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    function isDynamic(segment) {
      return paramRe.test(segment);
    }

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    function isSplat(segment) {
      return segment[0] === "*";
    }

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri) {
      return (
        uri
          // Strip starting/ending `/`
          .replace(/(^\/+|\/+$)/g, "")
          .split("/")
      );
    }

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    function stripSlashes(str) {
      return str.replace(/(^\/+|\/+$)/g, "");
    }

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
      const score = route.default
        ? 0
        : segmentize(route.path).reduce((score, segment) => {
            score += SEGMENT_POINTS;

            if (isRootSegment(segment)) {
              score += ROOT_POINTS;
            } else if (isDynamic(segment)) {
              score += DYNAMIC_POINTS;
            } else if (isSplat(segment)) {
              score -= SEGMENT_POINTS + SPLAT_PENALTY;
            } else {
              score += STATIC_POINTS;
            }

            return score;
          }, 0);

      return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
      return (
        routes
          .map(rankRoute)
          // If two routes have the exact same score, we go by index instead
          .sort((a, b) =>
            a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
          )
      );
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { path, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
      let match;
      let default_;

      const [uriPathname] = uri.split("?");
      const uriSegments = segmentize(uriPathname);
      const isRootUri = uriSegments[0] === "";
      const ranked = rankRoutes(routes);

      for (let i = 0, l = ranked.length; i < l; i++) {
        const route = ranked[i].route;
        let missed = false;

        if (route.default) {
          default_ = {
            route,
            params: {},
            uri
          };
          continue;
        }

        const routeSegments = segmentize(route.path);
        const params = {};
        const max = Math.max(uriSegments.length, routeSegments.length);
        let index = 0;

        for (; index < max; index++) {
          const routeSegment = routeSegments[index];
          const uriSegment = uriSegments[index];

          if (routeSegment !== undefined && isSplat(routeSegment)) {
            // Hit a splat, just grab the rest, and return a match
            // uri:   /files/documents/work
            // route: /files/* or /files/*splatname
            const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

            params[splatName] = uriSegments
              .slice(index)
              .map(decodeURIComponent)
              .join("/");
            break;
          }

          if (uriSegment === undefined) {
            // URI is shorter than the route, no match
            // uri:   /users
            // route: /users/:userId
            missed = true;
            break;
          }

          let dynamicMatch = paramRe.exec(routeSegment);

          if (dynamicMatch && !isRootUri) {
            const value = decodeURIComponent(uriSegment);
            params[dynamicMatch[1]] = value;
          } else if (routeSegment !== uriSegment) {
            // Current segments don't match, not dynamic, not splat, so no match
            // uri:   /users/123/settings
            // route: /users/:id/profile
            missed = true;
            break;
          }
        }

        if (!missed) {
          match = {
            route,
            params,
            uri: "/" + uriSegments.slice(0, index).join("/")
          };
          break;
        }
      }

      return match || default_ || null;
    }

    /**
     * Check if the `path` matches the `uri`.
     * @param {string} path
     * @param {string} uri
     * @return {?object}
     */
    function match(route, uri) {
      return pick([route], uri);
    }

    /**
     * Combines the `basepath` and the `path` into one path.
     * @param {string} basepath
     * @param {string} path
     */
    function combinePaths(basepath, path) {
      return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
    }

    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */
    function shouldNavigate(event) {
      return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
      );
    }

    function hostMatches(anchor) {
      const host = location.host;
      return (
        anchor.host == host ||
        // svelte seems to kill anchor.host value in ie11, so fall back to checking href
        anchor.href.indexOf(`https://${host}`) === 0 ||
        anchor.href.indexOf(`http://${host}`) === 0
      )
    }

    /* node_modules\svelte-routing\src\Router.svelte generated by Svelte v3.44.1 */

    function create_fragment$4(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $location;
    	let $routes;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, ['default']);
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	validate_store(routes, 'routes');
    	component_subscribe($$self, routes, value => $$invalidate(6, $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    	// If locationContext is not set, this is the topmost Router in the tree.
    	// If the `url` prop is given we force the location to it.
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);

    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(5, $location = value));

    	// If routerContext is set, the routerBase of the parent Router
    	// will be the base for this Router's descendants.
    	// If routerContext is not set, the path and resolved uri will both
    	// have the value of the basepath prop.
    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(7, $base = value));

    	const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    		// If there is no activeRoute, the routerBase will be identical to the base.
    		if (activeRoute === null) {
    			return base;
    		}

    		const { path: basepath } = base;
    		const { route, uri } = activeRoute;

    		// Remove the potential /* or /*splatname from
    		// the end of the child Routes relative paths.
    		const path = route.default
    		? basepath
    		: route.path.replace(/\*.*$/, "");

    		return { path, uri };
    	});

    	function registerRoute(route) {
    		const { path: basepath } = $base;
    		let { path } = route;

    		// We store the original path in the _path property so we can reuse
    		// it when the basepath changes. The only thing that matters is that
    		// the route reference is intact, so mutation is fine.
    		route._path = path;

    		route.path = combinePaths(basepath, path);

    		if (typeof window === "undefined") {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match(route, $location.pathname);

    			if (matchingRoute) {
    				activeRoute.set(matchingRoute);
    				hasActiveRoute = true;
    			}
    		} else {
    			routes.update(rs => {
    				rs.push(route);
    				return rs;
    			});
    		}
    	}

    	function unregisterRoute(route) {
    		routes.update(rs => {
    			const index = rs.indexOf(route);
    			rs.splice(index, 1);
    			return rs;
    		});
    	}

    	if (!locationContext) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = globalHistory.listen(history => {
    				location.set(history.location);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute
    	});

    	const writable_props = ['basepath', 'url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		onMount,
    		writable,
    		derived,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		pick,
    		match,
    		stripSlashes,
    		combinePaths,
    		basepath,
    		url,
    		locationContext,
    		routerContext,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		location,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute,
    		$location,
    		$routes,
    		$base
    	});

    	$$self.$inject_state = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('hasActiveRoute' in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$base*/ 128) {
    			// This reactive statement will update all the Routes' path when
    			// the basepath changes.
    			{
    				const { path: basepath } = $base;

    				routes.update(rs => {
    					rs.forEach(r => r.path = combinePaths(basepath, r._path));
    					return rs;
    				});
    			}
    		}

    		if ($$self.$$.dirty & /*$routes, $location*/ 96) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			{
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}
    	};

    	return [
    		routes,
    		location,
    		base,
    		basepath,
    		url,
    		$location,
    		$routes,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-routing\src\Route.svelte generated by Svelte v3.44.1 */

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*routeParams*/ 4,
    	location: dirty & /*$location*/ 16
    });

    const get_default_slot_context = ctx => ({
    	params: /*routeParams*/ ctx[2],
    	location: /*$location*/ ctx[4]
    });

    // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
    function create_if_block(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {:else}
    function create_else_block(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, routeParams, $location*/ 532)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(43:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#if component !== null}
    function create_if_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[4] },
    		/*routeParams*/ ctx[2],
    		/*routeProps*/ ctx[3]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$location, routeParams, routeProps*/ 28)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 16 && { location: /*$location*/ ctx[4] },
    					dirty & /*routeParams*/ 4 && get_spread_object(/*routeParams*/ ctx[2]),
    					dirty & /*routeProps*/ 8 && get_spread_object(/*routeProps*/ ctx[3])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(41:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$activeRoute*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(1, $activeRoute = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(4, $location = value));

    	const route = {
    		path,
    		// If no path prop is given, this Route will act as the default Route
    		// that is rendered if no other Route in the Router is a match.
    		default: path === ""
    	};

    	let routeParams = {};
    	let routeProps = {};
    	registerRoute(route);

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway.
    	if (typeof window !== "undefined") {
    		onDestroy(() => {
    			unregisterRoute(route);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('path' in $$new_props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onDestroy,
    		ROUTER,
    		LOCATION,
    		path,
    		component,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		location,
    		route,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    		if ('path' in $$props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$props) $$invalidate(0, component = $$new_props.component);
    		if ('routeParams' in $$props) $$invalidate(2, routeParams = $$new_props.routeParams);
    		if ('routeProps' in $$props) $$invalidate(3, routeProps = $$new_props.routeProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeRoute*/ 2) {
    			if ($activeRoute && $activeRoute.route === route) {
    				$$invalidate(2, routeParams = $activeRoute.params);
    			}
    		}

    		{
    			const { path, component, ...rest } = $$props;
    			$$invalidate(3, routeProps = rest);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		$activeRoute,
    		routeParams,
    		routeProps,
    		$location,
    		activeRoute,
    		location,
    		route,
    		path,
    		$$scope,
    		slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /**
     * A link action that can be added to <a href=""> tags rather
     * than using the <Link> component.
     *
     * Example:
     * ```html
     * <a href="/post/{postId}" use:link>{post.title}</a>
     * ```
     */
    function link(node) {
      function onClick(event) {
        const anchor = event.currentTarget;

        if (
          anchor.target === "" &&
          hostMatches(anchor) &&
          shouldNavigate(event)
        ) {
          event.preventDefault();
          navigate(anchor.pathname + anchor.search, { replace: anchor.hasAttribute("replace") });
        }
      }

      node.addEventListener("click", onClick);

      return {
        destroy() {
          node.removeEventListener("click", onClick);
        }
      };
    }

    /* src\components\navbar.svelte generated by Svelte v3.44.1 */
    const file$1 = "src\\components\\navbar.svelte";

    function create_fragment$2(ctx) {
    	let div0;
    	let t0;
    	let div4;
    	let div1;
    	let t1;
    	let div2;
    	let t2;
    	let div3;
    	let t3;
    	let nav;
    	let div5;
    	let ul;
    	let li0;
    	let a0;
    	let t5;
    	let li1;
    	let a1;
    	let t7;
    	let li2;
    	let a2;
    	let t9;
    	let li3;
    	let a3;
    	let t11;
    	let li4;
    	let a4;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			div4 = element("div");
    			div1 = element("div");
    			t1 = space();
    			div2 = element("div");
    			t2 = space();
    			div3 = element("div");
    			t3 = space();
    			nav = element("nav");
    			div5 = element("div");
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Home";
    			t5 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "Blogs";
    			t7 = space();
    			li2 = element("li");
    			a2 = element("a");
    			a2.textContent = "DynamoDB Course";
    			t9 = space();
    			li3 = element("li");
    			a3 = element("a");
    			a3.textContent = "Check Dimension";
    			t11 = space();
    			li4 = element("li");
    			a4 = element("a");
    			a4.textContent = "RCU-WCU Calculator";
    			attr_dev(div0, "class", "background-blur");
    			attr_dev(div0, "id", "backgroundBlur");
    			add_location(div0, file$1, 28, 0, 806);
    			attr_dev(div1, "class", "line1");
    			add_location(div1, file$1, 30, 2, 931);
    			attr_dev(div2, "class", "line2");
    			add_location(div2, file$1, 31, 2, 956);
    			attr_dev(div3, "class", "line3");
    			add_location(div3, file$1, 32, 2, 981);
    			attr_dev(div4, "class", "burger");
    			attr_dev(div4, "id", "burger");
    			add_location(div4, file$1, 29, 0, 877);
    			attr_dev(a0, "href", "/");
    			add_location(a0, file$1, 37, 10, 1087);
    			add_location(li0, file$1, 37, 6, 1083);
    			attr_dev(a1, "href", "https://blog.rahulahire.com");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file$1, 39, 8, 1161);
    			add_location(li1, file$1, 38, 6, 1147);
    			attr_dev(a2, "href", "https://rahulahire.thinkific.com");
    			attr_dev(a2, "target", "_blank");
    			add_location(a2, file$1, 43, 10, 1289);
    			add_location(li2, file$1, 43, 6, 1285);
    			attr_dev(a3, "href", "/dimension");
    			add_location(a3, file$1, 45, 8, 1421);
    			add_location(li3, file$1, 44, 6, 1407);
    			attr_dev(a4, "href", "/dynamodb-wrcu");
    			add_location(a4, file$1, 48, 8, 1523);
    			add_location(li4, file$1, 47, 6, 1509);
    			add_location(ul, file$1, 36, 4, 1071);
    			attr_dev(div5, "class", "nav-wrapper");
    			add_location(div5, file$1, 35, 2, 1040);
    			attr_dev(nav, "class", "navbar-sec");
    			add_location(nav, file$1, 34, 0, 1012);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div1);
    			append_dev(div4, t1);
    			append_dev(div4, div2);
    			append_dev(div4, t2);
    			append_dev(div4, div3);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div5);
    			append_dev(div5, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(ul, t5);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(ul, t7);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(ul, t9);
    			append_dev(ul, li3);
    			append_dev(li3, a3);
    			append_dev(ul, t11);
    			append_dev(ul, li4);
    			append_dev(li4, a4);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*burger*/ ctx[0], false, false, false),
    					listen_dev(div4, "click", /*burger*/ ctx[0], false, false, false),
    					listen_dev(a0, "click", /*burger*/ ctx[0], false, false, false),
    					action_destroyer(link.call(null, a0)),
    					listen_dev(a1, "click", /*burger*/ ctx[0], false, false, false),
    					listen_dev(a2, "click", /*burger*/ ctx[0], false, false, false),
    					action_destroyer(link.call(null, a2)),
    					listen_dev(a3, "click", /*burger*/ ctx[0], false, false, false),
    					action_destroyer(link.call(null, a3)),
    					listen_dev(a4, "click", /*burger*/ ctx[0], false, false, false),
    					action_destroyer(link.call(null, a4))
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(nav);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navbar', slots, []);

    	const burger = () => {
    		const burger = document.querySelector(".burger");
    		const backgroundBlur = document.querySelector(".background-blur");
    		const navSec = document.querySelector(".navbar-sec");
    		const navWrap = document.querySelector(".nav-wrapper");
    		burger.classList.toggle("toggle");
    		backgroundBlur.classList.toggle("bb-toggle");
    		navSec.classList.toggle("navSec-toggle");
    		navWrap.classList.toggle("navWrap-toggle");
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navbar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ link, burger });
    	return [burger];
    }

    class Navbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navbar",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\components\route.svelte generated by Svelte v3.44.1 */

    // (10:0) <Router {url}>
    function create_default_slot(ctx) {
    	let route0;
    	let t0;
    	let route1;
    	let t1;
    	let route2;
    	let current;

    	route0 = new Route({
    			props: { path: "/", component: Home },
    			$$inline: true
    		});

    	route1 = new Route({
    			props: { path: "dimension", component: Dimension },
    			$$inline: true
    		});

    	route2 = new Route({
    			props: { path: "/dynamodb-wrcu", component: Rcuwcu },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route0.$$.fragment);
    			t0 = space();
    			create_component(route1.$$.fragment);
    			t1 = space();
    			create_component(route2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(route0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(route1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(route2, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(route1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(route2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(10:0) <Router {url}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let navbar;
    	let t;
    	let router;
    	let current;
    	navbar = new Navbar({ $$inline: true });

    	router = new Router({
    			props: {
    				url: /*url*/ ctx[0],
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(navbar.$$.fragment);
    			t = space();
    			create_component(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(navbar, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};
    			if (dirty & /*url*/ 1) router_changes.url = /*url*/ ctx[0];

    			if (dirty & /*$$scope*/ 2) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(navbar, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, []);
    	let { url = "" } = $$props;
    	const writable_props = ['url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Route> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	$$self.$capture_state = () => ({
    		Dimension,
    		Wcu: Rcuwcu,
    		Home,
    		Router,
    		Route,
    		Navbar,
    		url
    	});

    	$$self.$inject_state = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [url];
    }

    class Route_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { url: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route_1",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get url() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.44.1 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let meta;
    	let t0;
    	let div;
    	let preload;
    	let t1;
    	let gtm;
    	let t2;
    	let router;
    	let current;
    	preload = new Preload({ $$inline: true });
    	gtm = new Gtm({ $$inline: true });
    	router = new Route_1({ $$inline: true });

    	const block = {
    		c: function create() {
    			meta = element("meta");
    			t0 = space();
    			div = element("div");
    			create_component(preload.$$.fragment);
    			t1 = space();
    			create_component(gtm.$$.fragment);
    			t2 = space();
    			create_component(router.$$.fragment);
    			attr_dev(meta, "name", "theme-color");
    			attr_dev(meta, "content", "#0f0f0f");
    			add_location(meta, file, 7, 2, 177);
    			attr_dev(div, "id", "app-container");
    			add_location(div, file, 10, 0, 239);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, meta);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(preload, div, null);
    			append_dev(div, t1);
    			mount_component(gtm, div, null);
    			append_dev(div, t2);
    			mount_component(router, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(preload.$$.fragment, local);
    			transition_in(gtm.$$.fragment, local);
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(preload.$$.fragment, local);
    			transition_out(gtm.$$.fragment, local);
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(meta);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			destroy_component(preload);
    			destroy_component(gtm);
    			destroy_component(router);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Preload, GTM: Gtm, Router: Route_1 });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	},
    	
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
