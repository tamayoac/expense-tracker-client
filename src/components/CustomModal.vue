<template>
  <Modal>
    <div class="bg-white">
      <header class="border-b bg-white w-full px-4 py-3">
        {{ action }} {{ title }}
      </header>
      <section>
        <slot name="body" />
      </section>
      <footer>
        <slot name="footer" />
      </footer>
    </div>
  </Modal>
</template>

<script>
export default {
  props: {
    title: String,
    action: String,
  },
};
</script>